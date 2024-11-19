import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accommodation } from './accommodation.entity';
import { LocationType } from '../location-types/location-type.entity';
import { FilterAccommodationsDto } from './dto/filter-accommodations.dto';
import { Location } from '../locations/location.entity';

@Injectable()
export class AccommodationService {
  constructor(
    @InjectRepository(Accommodation)
    private readonly accommodationRepository: Repository<Accommodation>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(LocationType)
    private readonly locationTypeRepository: Repository<LocationType>,
  ) {}

  // Phương thức lọc accommodation theo location_type.type
  async getAccommodationsByLocationType(
    filterAccommodationsDto: FilterAccommodationsDto,
  ): Promise<Accommodation[]> {
    const { location_type } = filterAccommodationsDto; // Đổi từ locationType thành location_type

    // Tìm locationType theo type
    const locationTypeEntity = await this.locationTypeRepository.findOne({
      where: { type: location_type }, // Đổi từ locationType thành location_type
    });

    if (!locationTypeEntity) {
      throw new Error('Invalid location type');
    }

    // Lọc accommodations theo locationTypeId
    return this.accommodationRepository.find({
      where: {
        location: {
          location_type: locationTypeEntity, // Đổi từ locationType thành location_type
        },
      },
      relations: ['location', 'location.location_type'], // Bao gồm cả location_type trong kết quả
    });
  }
}
