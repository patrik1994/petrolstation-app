import { Component, OnInit, PipeTransform } from '@angular/core';
import { PetrolStationService } from 'src/OpenApi/services';
import { FormControl } from '@angular/forms';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { DecimalPipe } from '@angular/common';

import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PetrolStationWithStatusesViewDto } from 'src/OpenApi/models/petrol-station-with-statuses-view-dto';
import { StationContainerService } from '../station-container.service';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css'],
  providers: [DecimalPipe]
})
export class StationsComponent implements OnInit {



  page = 1;
  pageSize = 25;
  collectionSize = 0;

  stations$: Observable<PetrolStationWithStatusesViewDto[]>;
  filter = new FormControl('', {nonNullable: true});


  constructor(private petrolStationService: PetrolStationService, pipe: DecimalPipe, private stationContainerService: StationContainerService )
  {
    this.stations$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, pipe))
    );
   }

  ngOnInit(): void {
    this.petrolStationService
      .apiPetrolStationGetPetrolStationsGet()
      .subscribe((petrolStations) => {
        this.stationContainerService.petrolStations = petrolStations;
          this.collectionSize = petrolStations.length;
    });
  }

  search(text: string, pipe: PipeTransform): PetrolStationWithStatusesViewDto[] {
    return this.stationContainerService.petrolStations.filter(ps => {
      const term = text.toLowerCase();

      return ps.city!.toLowerCase().includes(term)
          || ps.street!.toLowerCase().includes(term)
          ;
    });
  }
}
