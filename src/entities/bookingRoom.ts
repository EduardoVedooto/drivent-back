import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import Booking from "./Booking";
import Room from "./Room";

@Entity("bookingRoom")
export default class BookingsRooms extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Room, (room) => room.bookingRoom)
  room: Room;

  @OneToOne(() => Booking)
  @JoinColumn()
  booking: Booking;
}
