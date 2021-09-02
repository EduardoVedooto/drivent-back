import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import Enrollment from "./Enrollment";
import HotelOption from "./HotelOptions";
import TicketOption from "./TicketOptions";

@Entity("bookings")
export default class Booking extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isPaid: boolean;

  @Column()
  hasHotel: boolean;

  @ManyToOne(() => TicketOption, ticketOption => ticketOption.bookings)
  ticketOption: TicketOption;

  @OneToOne(() => Enrollment)
  @JoinColumn()
  enrollment: Enrollment;

  @ManyToOne(() => HotelOption, hotelOption => hotelOption.bookings)
  hotelOption: HotelOption;
}
