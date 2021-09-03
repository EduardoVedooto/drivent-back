import Hotel from "@/entities/Hotel";

export async function getHotels(userId: number) {
  return Hotel.getHotelsForUser(userId);
}
