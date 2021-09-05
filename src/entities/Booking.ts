import BookingInfo from "@/interfaces/bookingInfo";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import Enrollment from "./Enrollment";
import TicketOption from "./TicketOption";
import HotelOption from "./hotelOption";
import ConflictError from "@/errors/ConflictError";

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

    const existingBooking = await Booking.findOne({
      where: { enrollmentId }
    });
    if( existingBooking ) {
      throw new ConflictError("Participante já realizou uma reserva!");
    }

    const createBooking = Booking.create(reservation);
    await createBooking.save();

    const booking = await this.findByEnrollmentId( enrollmentId );
    return booking;
  }

  static async findByEnrollmentId( enrollmentId: number ) {
    const booking = await Booking.findOne({
      relations: ["ticketOption", "hotelOption"],
      where: { enrollmentId }
    });

    delete booking.hotelOptionId;
    delete booking.ticketOptionId;
    delete booking.ticketOption.id;
    delete booking.hotelOption.id;
    
    return booking;
  }
}
