import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifyStationComponent } from './modify-station/modify-station.component';
import { StationsComponent } from './stations/stations.component';

const routes: Routes = [
    { path: '', component: StationsComponent },
    { path: 'stations/:stationId', component: ModifyStationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
