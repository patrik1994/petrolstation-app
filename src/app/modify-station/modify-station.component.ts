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

  clicked: boolean[] = [false];
  stationIdFromRoute = 0;

  constructor( private route: ActivatedRoute, private stationContainerService: StationContainerService, private petrolStationService: PetrolStationService, private statusService: StatusService ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.stationIdFromRoute = Number(routeParams.get('stationId'));

    if(this.stationContainerService.petrolStations.length == 0){
      this.petrolStationService
      .apiPetrolStationGetPetrolStationsGet()
      .subscribe((petrolStations) => {
        this.stationContainerService.petrolStations = petrolStations;
        this.station = this.stationContainerService.petrolStations.find(s => s.id === this.stationIdFromRoute );
     });
    }
    else {
      this.station = this.stationContainerService.petrolStations.find(s => s.id === this.stationIdFromRoute );
      }

  }

  outOfFuel(_input: any, _rowIndex: any) {
    //console.log("outOfFuel: " + _input + " rowindex: " + _rowIndex);
    const fuelTypeId = getFuelTypeId(_input);

      const statusCreateDto: StatusCreateDto = {
      fuelType: fuelTypeId,
      isThereFuel: false,
      petrolStationId: this.stationIdFromRoute
     };

    this.statusService.apiStatusCreateStatusPost({body: statusCreateDto}).subscribe( /* TODO response success save to user */ );

    this.clicked[_rowIndex] = true;
  }

  thereIsFuel(_input: any, _rowIndex: any) {
    //console.log("thereIsFuel: " + _input + " rowindex: " + _rowIndex);

    const fuelTypeId = getFuelTypeId(_input);

    const statusCreateDto: StatusCreateDto = {
      fuelType: fuelTypeId,
      isThereFuel: true,
      petrolStationId: this.stationIdFromRoute
  };

    this.statusService.apiStatusCreateStatusPost({body: statusCreateDto}).subscribe( /* TODO response success save to user */ );

    this.clicked[_rowIndex] = true;
  }


}
function getFuelTypeId(_input: any) {
  switch (_input) {
    case "95-ös benzin":
      return 0;
    case "Diesel":
      return 1;
    case "98-as benzin":
      return 2;
    case "100-as benzin":
      return 3;
    case "95-ös prémium benzin":
      return 4;
    case "Prémium diesel":
      return 5;
    default:
      return 0;
  }
}

