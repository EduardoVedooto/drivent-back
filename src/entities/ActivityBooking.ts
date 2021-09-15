import ActivityEnrollmentAlreadyExists from "@/errors/ActivityEnrollmentAlreadyExists";
import NotFoundError from "@/errors/NotFoundError";
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

  static async findActivityEnrollment(activityId: number, bookingId: number) {
    const alreadyExists = await this.findOne({ where: { activityId, bookingId } });
    if(alreadyExists) throw new ActivityEnrollmentAlreadyExists();
  }

  static async postNewEnrollment(activityId: number, bookingId: number) {
    const booking = await Booking.getBookingById(bookingId);
    const activity = await Activities.getActivityById(activityId);
    
    if(!(booking && activity)) throw new NotFoundError();

    await this.findActivityEnrollment(activityId, bookingId);

    await this.insert({ bookingId, activityId });
  }
}
