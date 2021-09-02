import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("accommodationType")
export default class AccomodationType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;
}
