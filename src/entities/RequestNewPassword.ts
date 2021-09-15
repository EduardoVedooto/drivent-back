import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("requestNewPassword")
export default class requestNewPassword extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  email: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createAt: Date;
}
