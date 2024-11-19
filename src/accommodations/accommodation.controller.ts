import { Controller, Get, Query } from '@nestjs/common';
import { AccommodationService } from './accommodation.service';
import { FilterAccommodationsDto } from './dto/filter-accommodations.dto';
import { Accommodation } from './accommodation.entity';

@Controller('accommodations')
export class AccommodationController {
  constructor(private readonly accommodationService: AccommodationService) {}

  // Route lọc accommodation theo location_type.type
  @Get('filter')
  async getFilteredAccommodations(
    @Query() filterAccommodationsDto: FilterAccommodationsDto,
  ): Promise<Accommodation[]> {
    // Gọi service để lọc accommodation theo location type
    return this.accommodationService.getAccommodationsByLocationType(
      filterAccommodationsDto,
    );
  }
}
