import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PetrolStationService } from 'src/OpenApi/services';
import { FormControl } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DecimalPipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

import { Observable, of } from 'rxjs';
import { count, map, startWith } from 'rxjs/operators';
import { PetrolStationWithStatusesViewDto } from 'src/OpenApi/models/petrol-station-with-statuses-view-dto';
import { StationContainerService } from '../station-container.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

/*
feel free to fix it
https://material.angular.io/components/paginator/examples
*/
@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css'],
})
export class StationsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<PetrolStationWithStatusesViewDto>([]);
  displayedColums = ['city',"street"];
  pageSize = 10;

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(
    private petrolStationService: PetrolStationService,
    private stationContainerService: StationContainerService
  ) {}

  ngOnInit(): void {
    this.refreshPetrolStations();
  }

  ngAfterViewInit() {
    this.sort.disableClear = true;
    this.dataSource.sort = this.sort;
  }

  refreshPetrolStations() {
    this.petrolStationService
      .apiPetrolStationGetPetrolStationsGet({
        count: this.pageSize,
        page: this.pageEvent?.pageIndex ?? 1,
      })
      .subscribe((petrolStations) => {
        (this.dataSource.data = petrolStations.petrolStations!),
          (this.dataSource.data.length = petrolStations.totalCount!);
      });
  }

  public getServerData(event?: PageEvent) {
    this.refreshPetrolStations();
    return event;
  }
}

/*

  page = 1;
  pageSize = 25;
  collectionSize = 0;

  stations$: Observable<PetrolStationWithStatusesViewDto[]>;
  filter = new FormControl('', {nonNullable: true});
*/

/*  constructor(private petrolStationService: PetrolStationService, pipe: DecimalPipe, private stationContainerService: StationContainerService )
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
  }*/
