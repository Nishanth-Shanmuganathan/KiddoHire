import { UIService } from './ui.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let auth;
    let user = this.authService.user;
    this.authService.userSub.subscribe(res => {
      user = res;
    });
    this.authService.isAuthSubj.subscribe(authStatus => {
      auth = authStatus;
    });
    if (!auth && !(route.routeConfig.path === 'profile/:id' && route.queryParams.key)) {
      return this.router.navigate(['/']);
    }
    if (!(route.routeConfig.path === 'profile/:id' && route.queryParams.key) && !user.emailVerified) {
      this.uiService.centerDialog('Please verify your email id...');
      return this.router.navigate(['/']);
    }
    if (user.completion < 60 && !state.url.includes('/profile')) {
      this.uiService.centerDialog('Please complete your registration...');
      return this.router.navigate(['profile', user.profileName]);
    }
    return true;
  }
}
