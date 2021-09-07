import Hotel from "@/entities/Hotel";

export async function createHotel() {
  const hotel = Hotel.create({
    name: "hotel",
    imgUrl: "https://imagehotel.com",
  });

  await hotel.save();

  return hotel;
}
