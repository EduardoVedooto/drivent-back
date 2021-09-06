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

// import TicketOption from "@/entities/TicketOption";
// import HotelOption from "@/entities/HotelOption";
// import Enrollment from "@/entities/Enrollment";

// export async function createBooking(params: {
//   isPaid: boolean;
//   ticketOptionType: string;
//   hotelOptionType: boolean;
//   hasHotel: boolean;
//   enrollment: Enrollment
// }) {
//   const { isPaid, ticketOptionType, hotelOptionType, hasHotel, enrollment } = params;

//   const ticketOption = await TicketOption.findOne({
//     where: { type: ticketOptionType },
//   });

//   const hotelOption = await HotelOption.findOne({
//     where: { hasHotel: hotelOptionType },
//   });

//   const data = {
//     isPaid,
//     ticketOption,
//     hotelOption,
//     hasHotel,
//     enrollment,
//   };

//   const booking = await Booking.createOrUpdate(data);

//   return booking;
// }

