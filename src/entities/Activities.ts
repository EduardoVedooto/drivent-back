import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import ActivityLocation from "./ActivityLocation";

@Entity("activities")
export default class Activities extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "timestamptz" })
  date: Date;

  @Column()
  startsAt: string;

  @Column()
  endsAt: string;

  @Column()
  activityLocationId: number;
  
  @ManyToOne(() => ActivityLocation, activityLocation => activityLocation.activities)
  activityLocation: ActivityLocation;

  @Column()
  maxParticipants: number;
}
