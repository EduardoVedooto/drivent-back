import BookingRoom from "@/entities/bookingRoom";
import Booking from "@/entities/Booking";
import Room from "@/entities/Room";

export async function createBookingRoom(enrollmentId: number, roomId: number) {
  const booking = await Booking.findOne({ where: { enrollmentId } });
  const room = await Room.findOne({ where: { id: roomId } });
  const bookingRoomData = {
    booking,
    room,
  };
  const bookingRoom = await BookingRoom.create(bookingRoomData);
  bookingRoom.save();
}
