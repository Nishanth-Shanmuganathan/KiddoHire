import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  password = true;
  conPassword = true;

  constructor(
    private route: Router,
    private uiService: UIService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.registerForm = new FormGroup({
      email: new FormControl('nishanths.17it@kongu.edu', [Validators.required, Validators.email]),
      password: new FormControl('nishanth', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('nishanth', [Validators.required, Validators.minLength(8), this.confirmPassword.bind(this)]),
      role: new FormControl(null)
    });
  }

  confirmPassword(control: FormGroup) {
    if (this.registerForm) {
      if (control.value !== this.registerForm.value.password) {
        return { mismatch: true };
      }
      return null;
    }
  }

  register(role) {
    if (this.registerForm.invalid) { return; }

    const regCred = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
      role
    };
    this.authService.register(regCred);
  }
}
