import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import Enrollment from "./Enrollment";
import Room from "./Room";
import Booking from "./Booking";
import CannotPickHotelError from "@/errors/CannotPickHotelError";
import NotFoundError from "@/errors/NotFoundError";
import HotelData from "@/interfaces/hotel";

@Entity("hotels")
export default class Hotel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  imgUrl: string;

  @OneToMany(() => Room, (room) => room.hotel, { eager: true })
  rooms: Room[];

  static async getHotelsForUser(userId: number) {
    const details = [
      "Você precisa ter confirmado o pagamento antes de fazer a escolha de hospedagem",
    ];
    const enrollment = await Enrollment.getByUserIdWithAddress(userId);
    if(!enrollment) throw new CannotPickHotelError(details);
    const booking = await Booking.getByEnrollmentId(enrollment.id);
    if (!booking) throw new CannotPickHotelError(details);
    if (!booking?.isPaid) {
      throw new CannotPickHotelError(details);
    }
    const hotels = await this.find() as HotelData[];
    hotels.forEach((hotel) => {
      this.addAccommodationType(hotel);
      this.bedsAvailable(hotel);
      delete hotel.rooms;
    });
    return hotels;
  }

  static addAccommodationType(hotel: HotelData) {
    const accommodations = [];
    if(hotel.rooms.find(room => room.bedCount === 1)) accommodations.push("Single");
    if(hotel.rooms.find(room => room.bedCount === 2)) accommodations.push("Double");
    if(hotel.rooms.find(room => room.bedCount === 3)) accommodations.push("Triple");
    hotel.accommodationsType = accommodations;
  }

  static bedsAvailable(hotel: HotelData) {
    let guests = 0;
    const maxAvailable: number[] = hotel.rooms.map((room) =>  room.bedCount - room.bookingRoom.length);
    guests = maxAvailable.reduce((acc, value) => acc + value, 0);
    hotel.beds = guests;
  }
}
