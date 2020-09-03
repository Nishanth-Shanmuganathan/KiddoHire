import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import { Ng5SliderModule } from 'ng5-slider';

import { JobsComponent } from '../jobs/jobs.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: '', component: JobsComponent,
    children: [
      // {path:''}
    ]
  },
];

@NgModule({
  declarations: [
    JobsComponent,
    SearchComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    Ng5SliderModule
  ]
})
export class JobsModule { }
