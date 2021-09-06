import Booking from "@/entities/Booking";
import BookingInfo from "@/interfaces/bookingInfo";
import BodyInfoForBooking from "@/interfaces/bodyInfoForBooking";
import Enrollment from "@/entities/Enrollment";
import TicketOption from "@/entities/TicketOption";
import HotelOption from "@/entities/HotelOption";

export async function createReservation({ type, hotel, enrollmentId }: BodyInfoForBooking) {
  const ticketOptionId = await getTicketOptionId(type);
  const hotelOptionId = await getHotelOptionId(hotel);

  const existingEnrollmentId = await Enrollment.find({ where: { id: enrollmentId } });
  if (existingEnrollmentId.length === 0) return false;

  const bookingInfo = { enrollmentId, ticketOptionId, hotelOptionId } as BookingInfo;

  const reservation = await Booking.createNew(bookingInfo);
  return reservation;
}

export async function findByEnrollmentId(enrollmentId: number) {
  const reservation = await Booking.findByEnrollmentId(enrollmentId);
  if(!reservation) return false;
  return reservation;
}

export async function getAllReservations() {
  const reservation = await Booking.findAll();
  return reservation;
}

export async function updatePaymentStatus(bookingId: number) {
  const reservation = await Booking.confirmPayment(bookingId);
}

async function getTicketOptionId( type: string) {
  let ticketOptionId;
  const ticketOptionIdOnline = await TicketOption.findOne({ where: { type: "online" } });
  const ticketOptionIdPresencial = await TicketOption.findOne({ where: { type: "presencial" } });
  
  if (type === "online") {
    ticketOptionId = ticketOptionIdOnline.id;
  }

  if (type === "presencial") {
    ticketOptionId = ticketOptionIdPresencial.id;
  }

  return ticketOptionId;
}

async function getHotelOptionId(hotel: boolean) {
  let hotelOptionId;
  const hotelOptionIdOnline = await HotelOption.findOne({ where: { name: "sem hotel" } });
  const hotelOptionIdPresencial = await HotelOption.findOne({ where: { name: "drivent" } });
 
  if (hotel === false) {
    hotelOptionId = hotelOptionIdOnline.id;
  }

  if (hotel === true) {
    hotelOptionId = hotelOptionIdPresencial.id;
  }

  return hotelOptionId;
}
