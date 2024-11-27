import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Location } from './locations/location.entity';
import { LocationType } from './location-types/location-type.entity';
import { Accommodation } from './accommodations/accommodation.entity';
import { Promotion } from './promotions/promotion.entity';
import { AccommodationPromotion } from './accommodations/accommodation-promotions.entity';
import { AccommodationAmenity } from './accommodations/accommodation-amenities.entity';
import { Rating } from './ratings/rating.entity';
import { Booking } from './bookings/booking.entity';
import { Customer } from './customers/customer.entity';
import { Amenity } from './amenities/amenity.entity';

import { CustomerModule } from './customers/customer.module';
import { AccommodationModule } from './accommodations/accommodation.module';
import { LocationTypeModule } from './location-types/location-type.module';
import { LocationModule } from './locations/location.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [
          Location,
          Accommodation,
          Promotion,
          AccommodationPromotion,
          AccommodationAmenity,
          Rating,
          Booking,
          Customer,
          Amenity,
          LocationType,
        ],
        synchronize: true,
      }),
    }),
    CustomerModule,
    AccommodationModule,
    LocationTypeModule,
    LocationModule,
  ],
})
export class AppModule {}
