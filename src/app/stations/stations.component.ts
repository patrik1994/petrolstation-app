import { Component, OnInit } from '@angular/core';
import { Station } from '../station';
import { STATIONS } from '../mock-stations';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {

  stations = STATIONS;

  constructor() { }

  ngOnInit(): void {
  }

}
