import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Booking from "./Booking";

@Entity("ticketOptions")
export default class TicketOption extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  price: number;

  @OneToMany(() => Booking, booking => booking.ticketOption)
  bookings: Booking[];

  static async findAll() {
    const ticketOptions = await TicketOption.find();
    return ticketOptions;
  }

  static async getTicketOptionId(type: string) {
    let ticketOptionId;
    const ticketOptionIdOnline = await TicketOption.findOne({ where: { type: "Online" } });
    const ticketOptionIdPresencial = await TicketOption.findOne({ where: { type: "Presencial" } });
    
    if (type === "Online") {
      ticketOptionId = ticketOptionIdOnline.id;
    }
  
    if (type === "Presencial") {
      ticketOptionId = ticketOptionIdPresencial.id;
    }
  
    return ticketOptionId;
  }
}
