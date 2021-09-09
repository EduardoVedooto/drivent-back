import BookingsRooms from "@/entities/bookingRoom";
import Room from "@/entities/Room";

interface RoomData extends Room {
    hotelId: number,
    guests: BookingsRooms[]
}

export default RoomData;
