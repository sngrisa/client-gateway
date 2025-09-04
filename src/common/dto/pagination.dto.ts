import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  page?: number;

  @IsPositive()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  limit?: number;

}