import Booking from "@/entities/Booking";
import TicketOption from "@/entities/TicketOption";
import HotelOption from "@/entities/HotelOption";
import { createUser } from "./userFactory";
import { createEnrollment } from "./enrollmentFactory";

export async function createBooking(params: {
  isPaid: boolean;
  ticketOptionId: number;
  hotelOptionId: number;
  hasHotel: boolean;
}) {
  const { isPaid, ticketOptionId, hotelOptionId, hasHotel } = params;

  const user = await createUser();
  const enrollment = await createEnrollment(user);

  const ticketOption = await TicketOption.findOne({
    where: { id: ticketOptionId },
  });

  const hotelOption = await HotelOption.findOne({
    where: { id: hotelOptionId },
  });

  const data = {
    isPaid,
    ticketOption,
    hotelOption,
    hasHotel,
    enrollment,
  };

  const booking = await Booking.createOrUpdate(data);

  return booking;
}
