export * from './petrolStation.service';
import { PetrolStationService } from './petrolStation.service';
export * from './status.service';
import { StatusService } from './status.service';
export const APIS = [PetrolStationService, StatusService];
