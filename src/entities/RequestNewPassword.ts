import InvalidPasswordTokenError from "@/errors/InvalidPasswordTokenError";
import PasswordTokenExpiredError from "@/errors/PasswordTokenExpiredError";
import dayjs from "dayjs";
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

  static async getEmailByToken(token: string) {
    const request = await this.findOne({ 
      where: { token }, 
      select: ["email", "createAt"] 
    });
    if(!request) throw new InvalidPasswordTokenError();
    this.delete({ email: request.email });
    const dateRequested = dayjs(request.createAt);
    const now = dayjs(Date.now());
    const hoursElapsed = now.diff(dateRequested, "h");
    if( hoursElapsed > 24) throw new PasswordTokenExpiredError();
    return request.email;
  }
}
