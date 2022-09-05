import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PetrolStationService } from 'src/OpenApi/services';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { PetrolStationWithStatusesViewDto } from 'src/OpenApi/models/petrol-station-with-statuses-view-dto';
import { MatSort } from '@angular/material/sort';
import {  PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css'],
})
export class StationsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<PetrolStationWithStatusesViewDto>([]);
  displayedColums = ['city',"street","modify"];

  filterForm?: FormGroup;

  length = 100;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  filter: string;
  filter$ = new FormControl('', {nonNullable: true});

  public doFilter = (event: Event ) => {

    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  }

  constructor(
    private fb: FormBuilder,
    private petrolStationService: PetrolStationService
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

    this.filter$.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged()).subscribe(filter => {
        this.filter = filter,
        this.refreshPetrolStations()
      });
  }

  refreshPetrolStations() {
    this.petrolStationService
      .apiPetrolStationGetPetrolStationsGet({
        filter: this.filter,
        count: this.pageSize,
        page: this.pageIndex,
      })
      .subscribe((petrolStations) => {
        (this.dataSource.data = petrolStations.petrolStations!),
          (this.length = petrolStations.totalCount!);
      });
  }

  resetFilters() {
    this.filterForm?.reset();
  }

  public getServerData(event?: PageEvent) {
    this.pageIndex = event?.pageIndex!;
    this.pageSize = event?.pageSize!;
    this.refreshPetrolStations();
  }
}
