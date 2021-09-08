import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import ActivityBooking from "./ActivityBooking";
import ActivityLocation from "./ActivityLocation";
import Dates from "./Dates";

@Entity("activities")
export default class Activities extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  dateId: number;

  @Column()
  startsAt: string;

  @Column()
  endsAt: string;

  @Column()
  activityLocationId: number;
  
  @Column()
  maxParticipants: number;
  
  @ManyToOne(() => Dates, dates => dates.activities)
  date: Dates;

  @ManyToOne(() => ActivityLocation, activityLocation => activityLocation.activities)
  activityLocation: ActivityLocation;

  @OneToMany(() => ActivityBooking, activityBooking => activityBooking.activity)
  activityBooking: ActivityBooking;
}
