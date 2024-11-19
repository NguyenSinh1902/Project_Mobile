// location.dto.ts
import { IsEnum } from 'class-validator';

export class GetAllAccomodationDto {
  @IsEnum(['beach', 'mountain', 'island', 'camping'])
  type: string;
}
