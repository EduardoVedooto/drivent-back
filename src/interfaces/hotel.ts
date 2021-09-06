import Hotel from "@/entities/Hotel";

interface HotelData extends Hotel {
    accommodationsType: string[]
}

export default HotelData;
