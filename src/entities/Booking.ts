import BookingInfo from "@/interfaces/bookingInfo";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import Enrollment from "./Enrollment";
import TicketOption from "./TicketOption";
import HotelOption from "./hotelOption";

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

  @Column()
  hotelOptionId: number;

  @OneToOne(() => Enrollment)
  @JoinColumn()
  enrollment: Enrollment;

  @ManyToOne(() => TicketOption, ticketOption => ticketOption.bookings)
  ticketOption: TicketOption;

  @ManyToOne(() => HotelOption, hotelOption => hotelOption.bookings)
  hotelOption: HotelOption;

  static async createNew( { enrollmentId, ticketOptionId, hotelOptionId }: BookingInfo ) {
    const reservation = {
      isPaid: false,
      enrollmentId,
      ticketOptionId,
      hotelOptionId
    };

    const createBooking = Booking.create(reservation);
    const saveBooking = await createBooking.save();

    const booking = Booking.find({
      relations: ["ticketOption", "hotelOption"],
      where: { id: saveBooking.id }
    });
    return booking;
  }
}
