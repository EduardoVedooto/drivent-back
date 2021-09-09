import Booking from "@/entities/Booking";
import {
  createBasicHotelOptions,
  createBasicTicketOptions,
} from "../utils/app";


export async function createBooking(enrollmentId: number, isPaid: boolean) {

    const hotelOption = await createBasicHotelOptions();
    const hotelOptionId = hotelOption[0].id;
    
    const ticketOption = await createBasicTicketOptions();
    const ticketOptionId = ticketOption[0].id;
  
    const bookingData = {
      isPaid,
      enrollmentId,
      ticketOptionId,
      hotelOptionId
    }


  const booking = await Booking.create(bookingData);
  await booking.save();

  return booking;
}

export async function createBookingWithHotel(enrollmentId: number) {
  const hotelOption = await createBasicHotelOptions();
  const hotelOptionId = hotelOption[1].id;

  const ticketOption = await createBasicTicketOptions();
  const ticketOptionId = ticketOption[1].id;

  const bookingData = {
    isPaid: true,
    enrollmentId,
    ticketOptionId,
    hotelOptionId,
  };

  const booking = await Booking.create(bookingData);
  await booking.save();

  return booking;
}
