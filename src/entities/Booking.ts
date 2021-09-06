import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import Enrollment from "./Enrollment";
import TicketOption from "./TicketOption";
import HotelOption from "./HotelOption";
import ConflictError from "@/errors/ConflictError";
import NotFoundBooking from "@/errors/NotFoundBooking";
import AlreadyPaidBooking from "@/errors/AlreadyPaidBooking";
import BookingInfo from "@/interfaces/bookingInfo";
import BookingData from "@/interfaces/booking";

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
    const bookingInfo = {
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

    const createBooking = Booking.create(bookingInfo);
    await createBooking.save();

    const booking = await this.findByEnrollmentId( enrollmentId );
    return booking;
  }

  static async confirmPayment( bookingId: number ) {
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

  static async findByEnrollmentId( enrollmentId: number ) {
    const booking = await Booking.findOne({
      relations: ["ticketOption", "hotelOption"],
      where: { enrollmentId }
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

    booking.forEach(b => {
      delete b?.hotelOptionId;
      delete b?.ticketOptionId;
      delete b?.ticketOption.id;
      delete b?.hotelOption.id;
    });
    
    return booking;
  }

  static async getByEnrollmentId(enrollmentId: number) {
    return this.findOne({ where: { enrollmentId } });
  }

  populateFromData(data: BookingData) {
    this.isPaid = data.isPaid;
    this.ticketOption = data.ticketOption;
    this.enrollment = data.enrollment;
    this.hotelOption = data.hotelOption;
  }

  static async createOrUpdate(data: BookingData) {
    let booking = await this.findOne({ where: { enrollmentId: data.enrollment.id } });

    booking ||= Booking.create();

    booking.populateFromData(data);
    await booking.save();

    return booking;
  }
}
