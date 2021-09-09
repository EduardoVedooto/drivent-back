import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Activities from "./Activities";

@Entity("activityLocation")
export default class ActivityLocation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Activities, activities => activities.activityLocation)
  activities: Activities[];
}
