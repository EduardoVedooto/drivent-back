import Booking from "@/entities/Booking";
import BookingInfo from "@/interfaces/bookingInfo";
import BodyInfoForBooking from "@/interfaces/bodyInfoForBooking";

export async function createReservation({ type, hotel, enrollmentId }: BodyInfoForBooking) {
  const ticketOptionId = getTicketOptionId(type);
  const hotelOptionId = getHotelOptionId(hotel);
  const bookingInfo = { enrollmentId, ticketOptionId, hotelOptionId } as BookingInfo;

  const reservation = await Booking.createNew(bookingInfo);
  return reservation;
}

function getTicketOptionId( type: string) {
  let ticketOptionId;
  if (type === "online") {
    ticketOptionId = 1;
  }

  if (type === "presencial") {
    ticketOptionId = 2;
  }

  return ticketOptionId;
}

function getHotelOptionId(hotel: boolean) {
  let hotelOptionId;
  if (hotel === false) {
    hotelOptionId = 1;
  }

  if (hotel === true) {
    hotelOptionId = 2;
  }

  return hotelOptionId;
}
