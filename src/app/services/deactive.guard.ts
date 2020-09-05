import { UIService } from 'src/app/services/ui.service';
import { ProfileComponent } from './../pages/profile/profile.component';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable()
export class DeactivateGuard implements CanDeactivate<ProfileComponent> {

  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private router: Router) { }

  canDeactivate(
    component: ProfileComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log(state);
    let user = this.authService.user;
    this.authService.userSub.subscribe(res => {
      user = res;
    });
    if (user?.completion > 60) {
      return true;
    } else {
      this.uiService.centerDialog('Please complete your registration to proceed further...');
      return false;
    }
  }
}
