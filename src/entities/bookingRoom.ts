import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import Booking from "./Booking";
import Enrollment from "./Enrollment";
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

  static async getRoomForUser(roomId: number, userId: number) {
    const room = await Room.findOne({ where: { id: roomId } });
    const enrollment = await Enrollment.findOne({ where: { userId } });
    const booking = await Booking.findOne({ where: { enrollmentId: enrollment.id } });
    if(!room || !enrollment|| !booking) return false;
    else{
      const newBooking = this.create({ room, booking });
      await newBooking.save();
      return true;
    }
  }
}
