import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Accommodation } from './accommodation.entity';
import { Amenity } from '../amenities/amenity.entity';

@Entity()
export class AccommodationAmenity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Accommodation, (accommodation) => accommodation.amenities)
  @JoinColumn({ name: 'accommodation_id' })
  accommodation: Accommodation;

  @ManyToOne(() => Amenity, (amenity) => amenity.accommodations)
  @JoinColumn({ name: 'amenity_id' })
  amenity: Amenity;
}
