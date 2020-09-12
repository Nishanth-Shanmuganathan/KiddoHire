import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isMobile: boolean;
  loginForm: FormGroup;

  password = true;
  constructor(
    private route: Router,
    private uiService: UIService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });

  }

  login(form: FormGroup) {
    if (form.invalid) { return; }
    const loginCred = {
      email: form.value.email,
      password: form.value.password,
    };
    this.authService.login(loginCred);
  }



}
