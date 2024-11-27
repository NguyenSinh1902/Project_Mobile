import { Controller, Get, Query } from '@nestjs/common';
import { AccommodationService } from './accommodation.service';
import { FilterAccommodationsDto } from './dto/filter-accommodations.dto';
import { FilterAccommodationByTypeDto } from './dto/filter-accommodation-by-type.dto';
import { Accommodation } from './accommodation.entity';

@Controller('accommodations')
export class AccommodationController {
  constructor(private readonly accommodationService: AccommodationService) {}

  // Route lọc accommodation theo location_type.type
  @Get('filterByLocationType')
  async getFilteredAccommodations(
    @Query() filterAccommodationsDto: FilterAccommodationsDto,
  ): Promise<Accommodation[]> {
    // Gọi service để lọc accommodation theo location type
    return this.accommodationService.getAccommodationsByLocationType(
      filterAccommodationsDto,
    );
  }

  @Get('filterByType')
  async filterAccommodations(
    @Query() filterAccommodationByTypeDto: FilterAccommodationByTypeDto,
  ): Promise<Accommodation[]> {
    return this.accommodationService.filterAccommodations(
      filterAccommodationByTypeDto,
    );
  }
}
