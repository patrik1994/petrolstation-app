import { Component, OnInit } from '@angular/core';
import { Station } from '../station';
import { STATIONS } from '../mock-stations';
import { PetrolStationService } from 'src/OpenApi/services';
import { PetrolStationDto } from 'src/OpenApi/models';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {

  stations = STATIONS;
  petrolStations: PetrolStationDto[] = [];

  page = 1;
  pageSize = 25;

  constructor(private petrolStationService: PetrolStationService ) { }

  ngOnInit(): void {
    this.petrolStationService
      .apiPetrolStationGetPetrolStationsGet()
      .subscribe((petrolStations) => (this.petrolStations = petrolStations));
  }

}
