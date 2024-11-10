import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigModule và ConfigService
import { Location } from './locations/location.entity';
import { Accommodation } from './accommodations/accommodation.entity';
import { Promotion } from './promotions/promotion.entity';
import { AccommodationPromotion } from './accommodations/accommodation-promotions.entity';
import { AccommodationAmenity } from './accommodations/accommodation-amenities.entity';
import { Rating } from './ratings/rating.entity';
import { Booking } from './bookings/booking.entity';
import { Customer } from './customers/customer.entity';
import { Amenity } from './amenities/amenity.entity';

@Module({
  imports: [
    // Đảm bảo load biến môi trường từ file .env
    ConfigModule.forRoot(), // Cấu hình để đọc các biến từ .env

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule để sử dụng trong TypeOrmModule
      inject: [ConfigService], // Inject ConfigService vào để lấy giá trị từ biến môi trường
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'), // Lấy giá trị từ biến môi trường DB_HOST
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
        ],
        synchronize: true,
      }),
    }),
  ],
})
export class AppModule {}
