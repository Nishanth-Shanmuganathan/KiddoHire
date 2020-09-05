import { UIService } from 'src/app/services/ui.service';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthSubj = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  userSub = new BehaviorSubject<any>({});
  user;
  constructor(
    private route: Router,
    private http: HttpClient,
    private uiService: UIService
  ) { }

  login(loginData) {
    console.log(loginData);
    this.http.post<{ messgage: string, token: string }>(environment.server_url + 'auth/login', { loginData })
      .subscribe(res => {
        localStorage.setItem('token', 'nishanth');
        this.isAuthSubj.next(true);
        this.route.navigate(['home']);

      });
  }
  register(registerData) {
    console.log(registerData);
    this.http.post<{ message: string, token: string, user }>(environment.server_url + 'auth/register', { ...registerData })
      .subscribe(res => {
        console.log(res.user);
        this.user = res.user;
        this.uiService.centerDialog(res.message);
        localStorage.setItem('token', 'nishanth');
        this.isAuthSubj.next(true);
      });
  }
  logout() {
    localStorage.removeItem('token');
    this.isAuthSubj.next(false);
  }
}
