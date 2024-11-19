import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Location } from '../locations/location.entity';
import { AccommodationAmenity } from './accommodation-amenities.entity';
import { AccommodationPromotion } from './accommodation-promotions.entity';
import { Booking } from '../bookings/booking.entity';
import { Rating } from '../ratings/rating.entity';

@Entity()
export class Accommodation {
  @PrimaryGeneratedColumn()
  accommodation_id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ['hotel', 'resort', 'homestay', 'camping'] })
  type: string;

  @ManyToOne(() => Location, (location) => location.accommodations)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @Column('decimal')
  price_per_night: number;

  @Column('decimal')
  rating: number;

  @Column()
  max_guests: number;

  @Column('text')
  description: string;

  @Column('text')
  address: string;

  @Column()
  image_url: string;

  @OneToMany(() => AccommodationAmenity, (amenity) => amenity.accommodation)
  amenities: AccommodationAmenity[];

  @OneToMany(
    () => AccommodationPromotion,
    (promotion) => promotion.accommodation,
  )
  promotions: AccommodationPromotion[];

  @OneToMany(() => Booking, (booking) => booking.accommodation)
  bookings: Booking[];

  @OneToMany(() => Rating, (rating) => rating.accommodation)
  ratings: Rating[];
}
