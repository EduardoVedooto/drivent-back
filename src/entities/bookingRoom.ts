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
import Hotel from "./Hotel";
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
    if(!booking || !room || !enrollment) return false;
    const existingBookingRoom = await this.findOne({ where: { booking } });
    if(existingBookingRoom) return null;
    else{
      const newBooking = this.create({ room, booking });
      await newBooking.save();
      const bookedRoom = await this.findGuest(userId);
      return bookedRoom;
    }
  }

  static async findGuest(userId: number) {
    const enrollment = await Enrollment.findOne({ where: { userId } });
    const booking = await Booking.findOne({ where: { enrollmentId: enrollment.id } });
    const bookingRoom = await this.findOne({ relations: ["room"], where: { booking } });
    if(!booking || !enrollment || !bookingRoom) return false;
    const roomWithHotel = await Room.findOne({ relations: ["hotel"], where: { id: bookingRoom.room.id } });
    this.findRoom(roomWithHotel.id, roomWithHotel.hotel);
    return roomWithHotel.hotel;
  }

  static findRoom(roomId: number, hotel: Hotel) {
    const room = hotel.rooms.find(room => room.id === roomId);
    hotel.rooms = [room];
  }
}
