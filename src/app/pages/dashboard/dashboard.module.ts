import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';

import { DashboardComponent } from './dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { ChartComponent } from './chart/chart.component';
const routes: Routes = [
  {
    path: '', component: DashboardComponent,
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    ChartComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    ChartsModule
  ]
})
export class DashboardModule { }
