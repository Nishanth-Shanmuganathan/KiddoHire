import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import { Ng5SliderModule } from 'ng5-slider';

import { JobsComponent } from '../jobs/jobs.component';
import { SearchComponent } from './search/search.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { EmployeeJobCardComponent } from './employee-job-card/employee-job-card.component';
import { EmployerJobCardComponent } from './employer-job-card/employer-job-card.component';

const routes: Routes = [
  {
    path: '', component: JobsComponent,
    children: [
      { path: '', component: JobsListComponent }
    ]
  },
];

@NgModule({
  declarations: [
    JobsComponent,
    SearchComponent,
    JobsListComponent,
    EmployeeJobCardComponent,
    EmployerJobCardComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    Ng5SliderModule
  ]
})
export class JobsModule { }
