import CannotPickHotel from "@/errors/CannotPickHotelError";
import RoomData from "@/interfaces/room";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import BookingRoom from "./bookingRoom";
import Hotel from "./Hotel";

@Entity("rooms")
export default class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column()
  bedCount: number;

  @ManyToOne(() => Hotel, hotel => hotel.rooms)
  hotel: Hotel;

  @OneToMany(() => BookingRoom, bookingRoom => bookingRoom.room, { eager: true })
  bookingRoom: BookingRoom[];

  static async getRoomsForHotel(hotelId: number) {
    const details = [
      "Você precisa de um hotel válido para a busca de quartos",
    ];
    const hotel = await Hotel.findOne({ where: { id: hotelId } });
    if(!hotel) throw new CannotPickHotel(details);
    const rooms = await this.find({ where: { hotel: hotel }, order: { id: "DESC" } }) as RoomData[];
    rooms.forEach((room) => {
      room.hotelId = hotelId;
      room.guests = room.bookingRoom;
      delete room.bookingRoom;
    });
    return rooms;
  }
}
