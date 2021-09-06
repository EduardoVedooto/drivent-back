import Hotel from "@/entities/Hotel";

export async function getHotels(userId: number) {
  return await Hotel.getHotelsForUser(userId);
}
