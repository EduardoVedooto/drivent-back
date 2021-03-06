import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Activities from "./Activities";

@Entity("dates")
export default class Dates extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date" })
  day: string;

  @OneToMany(() => Activities, (activities) => activities.date)
  activities: Activities[];

  static async getAllDates() {
    return this.find();
  }

  static async getByDateText(dateText: string) {
    return this.findOne({ where: { day: dateText } });
  }
}
