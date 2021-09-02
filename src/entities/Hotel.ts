import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Bed from "./Bed";
import Room from "./Room";

@Entity("hotels")
export default class Hotel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Room, room => room.hotel)
  rooms: Room[];

  @OneToMany(() => Bed, bed => bed.hotel)
  beds: Bed[];
}
