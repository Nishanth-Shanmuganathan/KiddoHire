import { UIService } from 'src/app/services/ui.service';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthSubj = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  userSub = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
  user;
  constructor(
    private route: Router,
    private http: HttpClient,
    private uiService: UIService
  ) { }

  login(loginData) {
    console.log(loginData);
    this.http.post<{ message: string, token: string, user }>(environment.server_url + 'auth/login', { ...loginData })
      .subscribe(res => {
        this.user = res.user;
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('token', res.token);
        this.isAuthSubj.next(true);
        this.userSub.next(res.user);
        this.route.navigate(['home']);
        console.log(res.message);
        this.uiService.topDialog(res.message);

      });
  }
  register(registerData) {
    console.log(registerData);
    this.http.post<{ message: string, token: string, user }>(environment.server_url + 'auth/register', { ...registerData })
      .subscribe(res => {
        this.user = res.user;
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('token', res.token);
        this.uiService.centerDialog(res.message);
        this.isAuthSubj.next(true);
        this.userSub.next(res.user);
      }, err => {
        this.uiService.topDialog(err.error.message);
      });
  }
  logout() {
    localStorage.removeItem('token');
    this.isAuthSubj.next(false);
  }
  updateUser(user) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
    this.userSub.next(user);
  }

  verifyEmail(key) {
    console.log(key);
    return this.http.get<{ message: string, user }>(environment.server_url + 'auth/email/' + key)
      .pipe(tap(res => {
        this.uiService.topDialog(res.message);
        this.updateUser(res.user);
      }, err => {
        this.uiService.topDialog(err.error.message);
        this.route.navigate(['/']);
      }));
  }
}
