import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Hotel from "./Hotel";
import AccommodationType from "./AccommodationType";

@Entity("accommodationTypeHotel")
export default class AccommodationTypeHotel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AccommodationType)
  accommodationType: AccommodationType;

  @ManyToOne(() => Hotel, hotel => hotel.accommodationRelations)
  hotel: Hotel;
}
