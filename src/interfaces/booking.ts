import Enrollment from "@/entities/Enrollment";
import HotelOption from "@/entities/HotelOption";
import TicketOption from "@/entities/TicketOption";

interface BookingData {
  isPaid: boolean,
  hasHotel: boolean,
  ticketOption: TicketOption,
  enrollment: Enrollment,
  hotelOption: HotelOption, 
}

export default BookingData;
