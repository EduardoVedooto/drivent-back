import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Activities from "./Activities";
import Booking from "./Booking";

@Entity("activityBooking")
export default class ActivityBooking extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  activityId: number;

  @Column()
  bookingId: number;

  @ManyToOne(() => Activities, activity => activity.activityBookings)
  activity: Activities;

  @ManyToOne(() => Booking, booking => booking.activityBookings)
  booking: Booking;
}
