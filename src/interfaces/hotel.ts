import Hotel from "@/entities/Hotel";

interface HotelData extends Hotel {
    accommodationsType: string[]
    beds: number
}

export default HotelData;
