import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("hotelOptions")
export default class Session extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isPaid: boolean;

  @Column()
  ticketOptionId: number;

  @Column()
  enrollmentId: number;

  @Column()
  hotelOptionId: number;
}
