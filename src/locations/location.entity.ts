import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Accommodation } from '../accommodations/accommodation.entity';
import { Promotion } from '../promotions/promotion.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  location_id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ['beach', 'mountain', 'island', 'camping'] })
  type: string;

  @OneToMany(() => Accommodation, (accommodation) => accommodation.location)
  accommodations: Accommodation[];

  @OneToMany(() => Promotion, (promotion) => promotion.location)
  promotions: Promotion[];
}
