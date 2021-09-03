import Booking from "@/entities/Booking";
import BookingInfo from "@/interfaces/bookingInfo";
import BodyInfoForBooking from "@/interfaces/bodyInfoForBooking";

export async function createReservation({ type, hotel, enrollmentId }: BodyInfoForBooking) {
  const ticketOptionId = getTicketOptionId(type, hotel);
  const bookingInfo = { enrollmentId, ticketOptionId } as BookingInfo;

  const reservation = await Booking.createNew(bookingInfo);
  return reservation;
}

function getTicketOptionId( type: string, hotel: boolean) {
  let ticketOptionId;
  if (type === "presencial" && hotel === true) {
    ticketOptionId = 3;
  }

  if (type === "presencial" && hotel === false) {
    ticketOptionId = 2;
  }

  if ( type === "online") {
    ticketOptionId = 1;
  }

  return ticketOptionId;
}
