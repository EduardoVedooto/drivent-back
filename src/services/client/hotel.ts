import Hotel from "@/entities/Hotel";

export async function getHotels(userId: number, bypass: number) {
  return await Hotel.getHotelsForUser(userId, bypass);
}
