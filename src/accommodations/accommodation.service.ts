import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accommodation } from './accommodation.entity';
import { LocationType } from '../location-types/location-type.entity';
import { FilterAccommodationsDto } from './dto/filter-accommodations.dto';
import { FilterAccommodationByTypeDto } from './dto/filter-accommodation-by-type.dto';
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
    const { location_type } = filterAccommodationsDto;

    // Tìm locationType theo type
    const locationTypeEntity = await this.locationTypeRepository.findOne({
      where: { type: location_type },
    });

    if (!locationTypeEntity) {
      throw new Error('Invalid location type');
    }

    // Lọc accommodations theo locationTypeId
    return this.accommodationRepository.find({
      where: {
        location: {
          location_type: locationTypeEntity,
        },
      },
      relations: ['location', 'location.location_type'],
    });
  }

  // Phương thức lọc accommodation theo accommodation.type
  async filterAccommodations(
    filterAccommodationByTypeDto: FilterAccommodationByTypeDto,
  ): Promise<Accommodation[]> {
    const { type } = filterAccommodationByTypeDto;

    const query =
      this.accommodationRepository.createQueryBuilder('accommodation');

    // Apply filter if 'type' is provided
    if (type) {
      query.andWhere('accommodation.type = :type', { type });
    }

    return await query.getMany();
  }
}
