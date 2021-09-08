import Room from "@/entities/Room";

export async function getRooms(hotelId: number) {
  return await Room.getRoomsForHotel(hotelId);
}
