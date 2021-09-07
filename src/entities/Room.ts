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
    const hotel = await Hotel.findOne({ where: { id: hotelId } });
    const rooms = await this.find({ where: { hotel: hotel } }) as RoomData[];
    rooms.forEach((room) => room.hotelId = hotelId);
    return rooms;
  }
}
