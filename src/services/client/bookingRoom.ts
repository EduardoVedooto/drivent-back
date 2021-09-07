import BookingsRooms from "@/entities/bookingRoom";

export async function bookRoom(roomId: number, userId: number) {
  return await BookingsRooms.getRoomForUser(roomId, userId);
}
