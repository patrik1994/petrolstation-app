import { Component, OnInit, PipeTransform } from '@angular/core';
import { Station } from '../station';
import { STATIONS } from '../mock-stations';
import { PetrolStationService } from 'src/OpenApi/services';
import { PetrolStationDto } from 'src/OpenApi/models';
import { FormControl } from '@angular/forms';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { DecimalPipe } from '@angular/common';

import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css'],
  providers: [DecimalPipe]
})
export class StationsComponent implements OnInit {

  stations = STATIONS; //fixme delete this line?
  petrolStations: PetrolStationDto[] = [];

  page = 1;
  pageSize = 25;

  stations$: Observable<PetrolStationDto[]>;
  filter = new FormControl('', {nonNullable: true});
  
  
  constructor(private petrolStationService: PetrolStationService, pipe: DecimalPipe ) 
  {
    this.stations$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, pipe))
    );
   }

  ngOnInit(): void {
    this.petrolStationService
      .apiPetrolStationGetPetrolStationsGet()
      .subscribe((petrolStations) => (this.petrolStations = petrolStations));
  }

  search(text: string, pipe: PipeTransform): PetrolStationDto[] {
    console.log("running search");
    return this.petrolStations.filter(ps => {
      const term = text.toLowerCase();


      return ps.city!.toLowerCase().includes(term)
          || ps.street!.toLowerCase().includes(term)
          ;
    });
  }

}
