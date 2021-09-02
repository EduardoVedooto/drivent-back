import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Booking from "./Booking";

@Entity("hotelOptions")
export default class HotelOption extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hasHotel: string;

  @Column()
  price: number;

  @OneToMany(() => Booking, booking => booking.hotelOption)
  bookings: Booking[]
}
