import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany } from "typeorm";
import Enrollment from "./Enrollment";
import TicketOption from "./TicketOption";
import HotelOption from "./HotelOption";
import NotFoundBooking from "@/errors/NotFoundBooking";
import AlreadyPaidBooking from "@/errors/AlreadyPaidBooking";
import BookingInfo from "@/interfaces/bookingInfo";
import NotAllowedUpdateBooking from "@/errors/NotAllowedUpdateBooking";
import ActivityBooking from "./ActivityBooking";

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

  @ManyToOne(() => TicketOption, (ticketOption) => ticketOption.bookings)
  ticketOption: TicketOption;

  @ManyToOne(() => HotelOption, (hotelOption) => hotelOption.bookings)
  hotelOption: HotelOption;

  @OneToMany(() => ActivityBooking, activityBooking => activityBooking.booking)
  activityBookings: ActivityBooking[];

  static async createOrUpdate( { enrollmentId, ticketOptionId, hotelOptionId }: BookingInfo ) {
    const bookingInfo = {
      isPaid: false,
      enrollmentId,
      ticketOptionId,
      hotelOptionId,
    };

    const existingBooking = await Booking.findOne({
      where: { enrollmentId },
    });

    if( existingBooking && existingBooking.isPaid === false) {
      await Booking.createQueryBuilder()
        .update(this)
        .set({ isPaid: false, ticketOptionId, hotelOptionId })
        .where({ enrollmentId })
        .execute();
    } else if( existingBooking && existingBooking.isPaid === true) {
      throw new NotAllowedUpdateBooking();
    } else {
      const createBooking = Booking.create(bookingInfo);
      await createBooking.save();
    }

    const booking = await this.findByEnrollmentId(enrollmentId);
    return booking;
  }

  static async confirmPayment(bookingId: number) {
    const booking = await Booking.findOne({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new NotFoundBooking();
    }

    if (booking.isPaid === true) {
      const alreadyPaidBooking = await Booking.findOne({
        relations: ["enrollment"],
        where: { id: bookingId },
      });

      throw new AlreadyPaidBooking(alreadyPaidBooking.enrollment.name);
    }

    await Booking.createQueryBuilder()
      .update(this)
      .set({ isPaid: true })
      .where({ id: bookingId })
      .execute();
  }

  static async findByEnrollmentId(enrollmentId: number) {
    const booking = await Booking.findOne({
      relations: ["ticketOption", "hotelOption"],
      where: { enrollmentId },
    });

    delete booking?.hotelOptionId;
    delete booking?.ticketOptionId;
    delete booking?.ticketOption.id;
    delete booking?.hotelOption.id;

    return booking;
  }

  static async findAll() {
    const booking = await Booking.find({
      relations: ["ticketOption", "hotelOption"],
    });

    booking.forEach((b) => {
      delete b?.hotelOptionId;
      delete b?.ticketOptionId;
      delete b?.ticketOption.id;
      delete b?.hotelOption.id;
    });

    return booking;
  }

  static async getByEnrollmentId(
    enrollmentId: number,
    options: Record<string, unknown>
  ) {
    return this.findOne({ where: { enrollmentId }, ...options });
  }
}
