import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import Booking from "./Booking";
import Room from "./Room";
import Hotel from "./Hotel";

@Entity("beds")
export default class Bed extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isOccupied: boolean;

  @OneToOne(() => Booking)
  @JoinColumn()
  booking: Booking;

  @ManyToOne(() => Room, room => room.beds)
  room: Room;

  @ManyToOne(() => Hotel, hotel => hotel.beds)
  hotel: Hotel;
}
