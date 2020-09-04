import { AuthGuard } from './services/auth.gaurd';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'jobs',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/jobs/jobs.module').then(mod => mod.JobsModule)
  },
  {
    path: 'follows',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/follows/follows.module').then(mod => mod.FollowsModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/profile/profile.module').then(mod => mod.ProfileModule)
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
