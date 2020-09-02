import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';

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
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('nishanths.17it@kongu.edu', [Validators.required, Validators.email]),
      password: new FormControl('nishanth', [Validators.required, Validators.minLength(8)])
    });

  }

  login(form: FormGroup) {
    if (form.invalid) { return; }
    const loginCred = {
      email: form.value.email,
      password: form.value.password,
    };
    console.log(loginCred);
  }


}
