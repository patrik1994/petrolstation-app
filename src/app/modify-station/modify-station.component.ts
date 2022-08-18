import { Component, OnInit } from '@angular/core';
import { STATIONS } from '../mock-stations';

@Component({
  selector: 'app-modify-station',
  templateUrl: './modify-station.component.html',
  styleUrls: ['./modify-station.component.css']
})
export class ModifyStationComponent implements OnInit {

  fuelTypes = ["95-ös benzin", "Diesel", "98-as benzin", "100-as benzin", "95-ös prémium benzin", "Prémium diesel"];

  stations = STATIONS;
  currentStation = this.stations[12];

  constructor() { }

  ngOnInit(): void {
  }

}
