import BookingInfo from "@/interfaces/bookingInfo";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import Enrollment from "./Enrollment";
import TicketOption from "./TicketOptions";

@Entity("bookings")
export default class Booking extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isPaid: boolean;

  @Column()
  enrollmentId: number;

  @Column()
  ticketOptionId: number;

  @ManyToOne(() => TicketOption, ticketOption => ticketOption.bookings)
  ticketOption: TicketOption;

  @OneToOne(() => Enrollment)
  @JoinColumn()
  enrollment: Enrollment;

  static async createNew( { enrollmentId, ticketOptionId }: BookingInfo ) {
    const reservation = {
      isPaid: false,
      ticketOptionId,
      enrollmentId
    };

    console.log(reservation);

    const booking = Booking.create(reservation);
    await booking.save();
    return booking;
  }
}
