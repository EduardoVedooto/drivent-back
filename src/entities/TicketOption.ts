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

  static async getTicketOptionId( type: string) {
    let ticketOptionId;
    const ticketOptionIdOnline = await TicketOption.findOne({ where: { type: "online" } });
    const ticketOptionIdPresencial = await TicketOption.findOne({ where: { type: "presencial" } });
    
    if (type === "online") {
      ticketOptionId = ticketOptionIdOnline.id;
    }
  
    if (type === "presencial") {
      ticketOptionId = ticketOptionIdPresencial.id;
    }
  
    return ticketOptionId;
  }
}
