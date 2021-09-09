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
import HotelData from "@/interfaces/hotel";
import BookingsRooms from "./bookingRoom";

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
    const noPaymentDetails = [
      "Você precisa ter confirmado o pagamento antes de fazer a escolha de hospedagem",
    ];
    const noHotelOptionDetails = [
      "Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de ativideades"
    ];
    const enrollment = await Enrollment.getByUserIdWithAddress(userId);
    if (!enrollment) throw new CannotPickHotelError(noPaymentDetails, "1");
    const booking = await Booking.getByEnrollmentId(enrollment.id, {
      relations: ["hotelOption"],
    });
    if (!booking) throw new CannotPickHotelError(noPaymentDetails, "1");

    if (!booking?.isPaid) {
      throw new CannotPickHotelError(noPaymentDetails, "1");
    }
    const hasUserPayedForHotel = booking.hotelOption.price !== 0;
    if (!hasUserPayedForHotel) throw new CannotPickHotelError(noHotelOptionDetails, "2");

    const hotelWithBookedRoom = await BookingsRooms.findGuest(userId);
    if (hotelWithBookedRoom) return [hotelWithBookedRoom];
    else {
      const hotels = (await this.find({ order: { id: "ASC" } })) as HotelData[];
      hotels.forEach((hotel) => {
        this.addAccommodationType(hotel);
        this.bedsAvailable(hotel);
        delete hotel.rooms;
      });
      return hotels;
    }
  }

  static addAccommodationType(hotel: HotelData) {
    const accommodations = [];
    const hasSingleRoom = !!hotel.rooms.find((room) => room.bedCount === 1);
    const hasDoubleRoom = !!hotel.rooms.find((room) => room.bedCount === 2);
    const hasTripleRoom = !!hotel.rooms.find((room) => room.bedCount === 3);
    if (hasSingleRoom) accommodations.push("Single");
    if (hasDoubleRoom) accommodations.push("Double");
    if (hasTripleRoom) accommodations.push("Triple");
    hotel.accommodationsType = accommodations;
  }

  static bedsAvailable(hotel: HotelData) {
    let guests = 0;
    const maxAvailable: number[] = hotel.rooms.map(
      (room) => room.bedCount - room.bookingRoom.length
    );
    guests = maxAvailable.reduce((acc, value) => acc + value, 0);
    hotel.beds = guests;
  }
}
