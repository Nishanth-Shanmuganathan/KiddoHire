import { DeactivateGuard } from './../../services/deactive.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { AddSkillComponent } from './add-skill/add-skill.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', canDeactivate: [DeactivateGuard], component: ProfileComponent,
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
  ],
  providers: [DeactivateGuard]
})
export class ProfileModule { }
