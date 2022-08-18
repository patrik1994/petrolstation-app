/* tslint:disable */
/* eslint-disable */
import { FuelTypesDto } from './fuel-types-dto';
export interface StatusCreateDto {
  fuelType?: FuelTypesDto;
  isThereFuel?: boolean;
  petrolStationId?: number;
}
