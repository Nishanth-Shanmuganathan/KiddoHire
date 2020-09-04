import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import { FollowsComponent } from './follows.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ProfileComponent } from '../profile/profile.component';

const routes: Routes = [
  {
    path: '', component: FollowsComponent,
  },
];

@NgModule({
  declarations: [
    FollowsComponent,
    ProfileCardComponent,
    ProfileComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class FollowsModule { }
