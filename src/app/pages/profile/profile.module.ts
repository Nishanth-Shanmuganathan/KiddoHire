import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { AddSkillComponent } from './add-skill/add-skill.component';

const routes: Routes = [
  {
    path: '', component: ProfileComponent,
  },
];

@NgModule({
  declarations: [
    ProfileComponent,
    AddSkillComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class ProfileModule { }
