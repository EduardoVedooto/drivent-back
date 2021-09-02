import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Booking from "./Booking";

@Entity("ticketOptions")
export default class TicketOption extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  price: number;

  @OneToMany(() => Booking, booking => booking.ticketOption)
  bookings: Booking[]
}
