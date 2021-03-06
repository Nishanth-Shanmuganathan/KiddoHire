import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./../dashboard/dashboard.module').then(mod => mod.DashboardModule)
      }
    ]
  },
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class HomeModule { }
