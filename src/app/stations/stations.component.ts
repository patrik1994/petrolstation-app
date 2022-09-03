import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PetrolStationService } from 'src/OpenApi/services';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DecimalPipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

import { Observable, of } from 'rxjs';
import { count, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
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

  filterForm?: FormGroup;

  length = 100;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent?: PageEvent;

  public doFilter = (event: Event ) => {

    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  }

  constructor(
    private fb: FormBuilder,
    private petrolStationService: PetrolStationService,
    private stationContainerService: StationContainerService
  ) {

    this.filterForm = this.fb.group({
    city: [],
    street: []
  });
}

  ngOnInit(): void {
    this.refreshPetrolStations();
  }

  ngAfterViewInit() {
    this.sort.disableClear = true;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = this.filterPredicate;
    this.filterForm.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      distinctUntilChanged()).subscribe(() => this.dataSource.filter = '#');
  }

  filterPredicate = (data: PetrolStationWithStatusesViewDto, _: string): boolean => {

    const { city, street } = this.filterForm.getRawValue();

    if (city) {
      const value = city.toLowerCase();
      if (data.city.toLowerCase().includes(value) == false)
        return false;
    }

    if (street) {
      const value = street.toLowerCase();
      if (data.street.toLowerCase().includes(value) == false)
        return false;
    }

    return true;
  }

  refreshPetrolStations() {
    this.petrolStationService
      .apiPetrolStationGetPetrolStationsGet({
        count: this.pageSize,
        page: this.pageIndex,
      })
      .subscribe((petrolStations) => {
        (this.dataSource.data = petrolStations.petrolStations!),
          (this.dataSource.data.length = petrolStations.totalCount!);
      });
  }

  resetFilters() {
    this.filterForm?.reset();
  }

  public getServerData(event?: PageEvent) {
    this.pageIndex = event?.pageIndex!;
    this.refreshPetrolStations();
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
