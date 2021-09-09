import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Activities from "./Activities";

@Entity("activityLocation")
export default class ActivityLocation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Activities, (activities) => activities.activityLocation)
  activities: Activities[];

  static async getActivitiesWithDateId(dateId: number) {
    const locationsWithActivities = await this.createQueryBuilder(
      "activityLocation"
    )
      .leftJoinAndSelect("activityLocation.activities", "activities")
      .where("activities.dateId = :dateId", { dateId })
      .orderBy({ "activities.startsAt": "ASC", "activityLocation.name": "ASC" })
      .getMany();
    locationsWithActivities.forEach((location) => {
      location.activities.forEach((activity) => {
        delete activity.dateId;
        delete activity.activityLocationId;
      });
    });
    return locationsWithActivities;
  }
}
