import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Booking from "./Booking";

@Entity("hotelOptions")
export default class HotelOption extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @OneToMany(() => Booking, booking => booking.hotelOption)
  bookings: Booking[];

  static async getHotelOptionId(hotel: boolean) {
    let hotelOptionId;
    const hotelOptionIdOnline = await HotelOption.findOne({ where: { name: "sem hotel" } });
    const hotelOptionIdPresencial = await HotelOption.findOne({ where: { name: "drivent" } });
   
    if (hotel === false) {
      hotelOptionId = hotelOptionIdOnline.id;
    }
  
    if (hotel === true) {
      hotelOptionId = hotelOptionIdPresencial.id;
    }
  
    return hotelOptionId;
  }
}
