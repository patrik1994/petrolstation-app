import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetrolStationWithStatusesViewDto } from 'src/OpenApi/models/petrol-station-with-statuses-view-dto';
import { StatusCreateDto, StatusDto } from 'src/OpenApi/models';
import { PetrolStationService, StatusService } from 'src/OpenApi/services';

@Component({
  selector: 'app-modify-station',
  templateUrl: './modify-station.component.html',
  styleUrls: ['./modify-station.component.css']
})
export class ModifyStationComponent implements OnInit {
  station!: PetrolStationWithStatusesViewDto | undefined;
  fuelTypes = ["95-ös benzin", "98-as benzin", "100-as benzin", "95-ös prémium benzin", "Diesel", "Prémium diesel"];

  clicked: boolean[] = [false];
  stationIdFromRoute = 0;
  statusList: StatusDto[] = [];
  fuelList: number[] = [];
  fuelListResult: string[] = [];

  constructor( private route: ActivatedRoute, private petrolStationService: PetrolStationService, private statusService: StatusService ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.stationIdFromRoute = Number(routeParams.get('stationId'));

    this.petrolStationService
      .apiPetrolStationPetrolStationIdGet({petrolStationId: this.stationIdFromRoute})
      .subscribe( petrolStation => {
          this.station = petrolStation,
          this.fillStatusList();
        }
      );
  }

  fillStatusList() {
    //console.log("init statuses" + this.station?.statuses);
    this.statusList = this.station?.statuses!; //add fitler created in last 36 hours TODO

    this.statusList?.forEach((element) => {
      //console.log("element: " + element.fuelType + " isthere: " + element.isThereFuel);
      if (element.fuelType !== undefined) {
        if (this.fuelList[element.fuelType] === undefined) this.fuelList[element.fuelType] = 0;
        this.fuelList[element.fuelType] += element.isThereFuel ? 1 : -1;
      }
      //fixme store number of votes, get average
    });

    this.fuelList.forEach((value, index) => {
      console.log(index + " - " + value);
      if (value > 0) {
        this.fuelListResult[index] = "van";
      } else if (value < 0){
        this.fuelListResult[index] = "nincs";
      } else {
        this.fuelListResult[index] = "nincs adat";
      }

    });
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
    case "98-as benzin":
      return 1;
    case "100-as benzin":
      return 2;
    case "95-ös prémium benzin":
      return 3;
    case "Diesel":
      return 4;
    case "Prémium diesel":
      return 5;
    default:
      return 0;
  }
}

