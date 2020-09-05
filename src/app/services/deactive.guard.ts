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
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let completion = this.authService.user.completion;
    this.authService.userSub.subscribe(user => {
      completion = user.completion;
      return this.deactivate(completion > 60);
    });
    return this.deactivate(completion > 60);
  }

  deactivate(completion: boolean) {
    if (!completion) {
      console.log('hlooooo');
      return true;
    }
    console.log('hiii');
    this.uiService.centerDialog('Please complete your registration to proceed further...');
    return false;
  }


}
