import HotelOption from "@/entities/HotelOption";

export async function getHotelOptions() {
  const hotelOption = await HotelOption.findAll();
  return hotelOption;
}
