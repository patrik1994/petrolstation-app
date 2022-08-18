/* tslint:disable */
/* eslint-disable */
import { FuelTypesDto } from './fuel-types-dto';
export interface StatusDto {
  createdAt?: string;
  createdBy?: null | string;
  fuelType?: FuelTypesDto;
  id?: null | number;
  isThereFuel?: boolean;
  petrolStationId?: number;
}
