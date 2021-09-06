import Booking from "@/entities/Booking";
import {createBasicHotelOptions, createBasicTicketOptions} from "../utils/app";

export async function createBooking(enrollmentId: number) {

    const hotelOption = await createBasicHotelOptions(); //await HotelOption.findOne
    const hotelOptionId = hotelOption[0].id;
    
    const ticketOption = await createBasicTicketOptions();
    const ticketOptionId = ticketOption[0].id;
  
    const bookingData = {
    isPaid: false,
      enrollmentId,
      ticketOptionId,
      hotelOptionId
  };

  const booking = await Booking.create(bookingData);
  await booking.save();
  
  return booking;
}

