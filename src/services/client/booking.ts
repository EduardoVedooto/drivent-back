import Booking from "@/entities/Booking";
import BookingInfo from "@/interfaces/bookingInfo";
import BodyInfoForBooking from "@/interfaces/bodyInfoForBooking";
import Enrollment from "@/entities/Enrollment";
import TicketOption from "@/entities/TicketOption";
import HotelOption from "@/entities/HotelOption";

export async function createBooking({ type, hotel, enrollmentId }: BodyInfoForBooking) {
  const ticketOptionId = await TicketOption.getTicketOptionId(type);
  const hotelOptionId = await HotelOption.getHotelOptionId(hotel);

  const existingEnrollmentId = await Enrollment.find({ where: { id: enrollmentId } });
  if (existingEnrollmentId.length === 0) return false;

  const bookingInfo = { enrollmentId, ticketOptionId, hotelOptionId } as BookingInfo;

  const booking = await Booking.createNew(bookingInfo);
  return booking;
}

export async function findByEnrollmentId(enrollmentId: number) {
  const booking = await Booking.findByEnrollmentId(enrollmentId);
  if(!booking) return false;
  return booking;
}

export async function getAllBookings() {
  const booking = await Booking.findAll();
  return booking;
}

export async function updatePaymentStatus(bookingId: number) {
  await Booking.confirmPayment(bookingId);
}
