import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let auth;
    this.authService.isAuthSubj.subscribe(authStatus => {
      auth = authStatus;
      return this.route(auth);
    });
    return this.route(auth);
  }

  route(auth: boolean) {
    if (!auth) {
      return this.router.navigate(['/']);
    }
    return true;
  }


}
