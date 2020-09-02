import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthSubj = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));

  constructor(
    private route: Router
  ) { }

  login(loginData) {
    console.log(loginData);
    localStorage.setItem('token', 'nishanth');
    this.isAuthSubj.next(true);
    this.route.navigate(['home']);
  }
  register(registerData) {
    console.log(registerData);
    localStorage.setItem('token', 'nishanth');
    this.isAuthSubj.next(true);
    this.route.navigate(['home']);
  }
  logout() {
    localStorage.removeItem('token');
    this.isAuthSubj.next(false);
  }
}
