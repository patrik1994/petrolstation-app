import { Component, OnInit } from '@angular/core';
import { MyFuelType } from '../model/myFuelType';

@Component({
  selector: 'app-modify-station',
  templateUrl: './modify-station.component.html',
  styleUrls: ['./modify-station.component.css']
})
export class ModifyStationComponent implements OnInit {

  fuelTypes = MyFuelType;

  constructor() { }

  ngOnInit(): void {
  }

}
