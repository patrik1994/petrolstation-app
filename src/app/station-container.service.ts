import { Injectable } from '@angular/core';
import { PetrolStationWithStatusesViewDto } from 'src/OpenApi/models';

@Injectable({
  providedIn: 'root'
})
export class StationContainerService {

  public petrolStations: PetrolStationWithStatusesViewDto[] = [];
  constructor() { }
}
