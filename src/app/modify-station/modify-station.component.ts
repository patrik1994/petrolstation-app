import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetrolStationWithStatusesViewDto } from 'src/OpenApi/models/petrol-station-with-statuses-view-dto';
import { PetrolStationViewDto, StatusCreateDto } from 'src/OpenApi/models';
import { PetrolStationService, StatusService } from 'src/OpenApi/services';
import { StationContainerService } from '../station-container.service';

@Component({
  selector: 'app-modify-station',
  templateUrl: './modify-station.component.html',
  styleUrls: ['./modify-station.component.css']
})
export class ModifyStationComponent implements OnInit {
  station!: PetrolStationWithStatusesViewDto | undefined;
  fuelTypes = ["95-ös benzin", "Diesel", "98-as benzin", "100-as benzin", "95-ös prémium benzin", "Prémium diesel"];

  //stations = STATIONS;
  clicked: boolean[] = [false];

  constructor( private route: ActivatedRoute, private stationContainerService: StationContainerService, private petrolStationService: PetrolStationService, private statusService: StatusService ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const stationIdFromRoute = Number(routeParams.get('stationId'));

    if(this.stationContainerService.petrolStations.length == 0){
      this.petrolStationService
      .apiPetrolStationGetPetrolStationsGet()
      .subscribe((petrolStations) => {
        this.stationContainerService.petrolStations = petrolStations;
        this.station = this.stationContainerService.petrolStations.find(s => s.id === stationIdFromRoute );
     });
    }
    else {
      this.station = this.stationContainerService.petrolStations.find(s => s.id === stationIdFromRoute );
      }

  }

  outOfFuel(_input: any, _rowIndex: any) {
    //console.log("outOfFuel: " + _input + " rowindex: " + _rowIndex) ;
     const statusCreateDto: StatusCreateDto = {
      fuelType: 1,
    isThereFuel: true,
    petrolStationId: 1695
  };

    this.statusService.apiStatusCreateStatusPost({body: statusCreateDto}).subscribe( /* TODO response success save to user */ ) );

    this.clicked[_rowIndex] = true;
  }

  thereIsFuel(_input: any, _rowIndex: any) {
    //console.log("thereIsFuel: " + _input + " rowindex: " + _rowIndex);
    this.clicked[_rowIndex] = true;
  }


}
