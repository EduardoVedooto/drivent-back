import ActivityEnrollmentAlreadyExists from "@/errors/ActivityEnrollmentAlreadyExists";
import ConflictBetweenActivities from "@/errors/ConflictBetweenActivities";
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

  static async checkConflict(activityId: number, bookingId: number) {
    const EnrollmentList = await this.find({ 
      where: { bookingId },
      relations: ["activity"]
    });
    const activityToEnroll = await Activities.findOne({
      where: { id: activityId },
      select: ["startsAt", "endsAt", "dateId"]
    });
    const newActivity = {
      startsAt: Number(activityToEnroll.startsAt.replace(":", "")),
      endsAt: Number(activityToEnroll.endsAt.replace(":", ""))
    };
    const scheduleList = EnrollmentList.map(item => {
      return {
        startsAt: Number(item.activity.startsAt.replace(":", "")),
        endsAt: Number(item.activity.endsAt.replace(":", "")),
        name: item.activity.name,
        dateId: item.activity.dateId
      };
    });
    const conflict = scheduleList.find(item => {
      if(activityToEnroll.dateId !== item.dateId) return false;
      return (
        newActivity.startsAt === item.startsAt ||
        (newActivity.startsAt > item.startsAt && newActivity.startsAt < item.endsAt) ||
        (newActivity.endsAt > item.startsAt && newActivity.endsAt < item.endsAt) ||
        newActivity.endsAt === item.endsAt
      );
    });

    if(conflict) throw new ConflictBetweenActivities(conflict.name);
  }

  static async postNewEnrollment(activityId: number, bookingId: number) {
    const booking = await Booking.getBookingById(bookingId);
    const activity = await Activities.getActivityById(activityId);
    
    if(!(booking && activity)) throw new NotFoundError();

    await this.findActivityEnrollment(activityId, bookingId);
    await this.checkConflict(activityId, bookingId);

    await this.insert({ bookingId, activityId });
  }
}
