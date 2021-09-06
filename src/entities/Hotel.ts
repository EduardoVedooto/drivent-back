import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import Enrollment from "./Enrollment";
import Room from "./Room";
import Booking from "./Booking";
import CannotPickHotelError from "@/errors/CannotPickHotelError";
import NotFoundError from "@/errors/NotFoundError";

@Entity("hotels")
export default class Hotel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  imgUrl: string;

  @OneToMany(() => Room, (room) => room.hotel)
  rooms: Room[];

  static async getHotelsForUser(userId: number) {
    const enrollment = await Enrollment.getByUserIdWithAddress(userId);
    if (!enrollment) throw new NotFoundError();
    const booking = await Booking.getByEnrollmentId(enrollment.id);
    if (!booking?.isPaid) {
      const details = [
        "Você precisa ter confirmado o pagamento antes de fazer a escolha de hospedagem",
      ];
      throw new CannotPickHotelError(details);
    }
    return this.find();
  }
}
