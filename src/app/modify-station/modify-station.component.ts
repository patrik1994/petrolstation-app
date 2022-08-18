import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { STATIONS } from '../mock-stations';
import { Station } from '../station';

@Component({
  selector: 'app-modify-station',
  templateUrl: './modify-station.component.html',
  styleUrls: ['./modify-station.component.css']
})
export class ModifyStationComponent implements OnInit {
  station!: Station | undefined;
  fuelTypes = ["95-ös benzin", "Diesel", "98-as benzin", "100-as benzin", "95-ös prémium benzin", "Prémium diesel"];

  stations = STATIONS;
  
  constructor( private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const stationIdFromRoute = Number(routeParams.get('stationId'));

    this.station = this.stations.find(
      (station: { id: number; }) => station.id === stationIdFromRoute
    );

  }

  outOfFuel(_input: any) {
    console.log("outOfFuel:" + _input);
  }

  thereIsFuel(_input: any) {
    console.log("thereIsFuel:" + _input);
  }


}
