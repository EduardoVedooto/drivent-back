import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import Booking from "./Booking";
import Room from "./Room";
import Hotel from "./Hotel";
import AccommodationType from "./AccommodationType";

@Entity("AccommodationTypeHotel")
export default class AccommodationTypeHotel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AccommodationType)
  accommodationType: AccommodationType;

  @ManyToOne(() => Hotel, hotel => hotel.accommodationRelations)
  hotel: Hotel;
}
