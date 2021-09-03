import BookingData from "@/interfaces/booking";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import Enrollment from "./Enrollment";
import HotelOption from "./HotelOption";
import TicketOption from "./TicketOption";

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
  
  @Column()
  enrollmentId: number;

  static async getByEnrollmentId(enrollmentId: number) {
    return this.findOne({ where: { enrollmentId } });
  }

  populateFromData(data: BookingData) {
    this.isPaid = data.isPaid;
    this.hasHotel = data.hasHotel;
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
