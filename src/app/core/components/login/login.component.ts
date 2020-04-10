import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'core/services';
import { LoginCredential } from 'shared/models';

@Component({
  selector: 'ii-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginCredential: LoginCredential = {
    username: '',
    password: '',
  };

  invalidLogin = false;
  returnUrl: string;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    // reset login status
    this.authService.logout();

    // Get the query params
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/home';

      if (this.authService.isAuthenticated()) {
        this.router.navigate([this.returnUrl]);
      }
    });

    this.resetErrorHandling();
    this.createForm(this.loginCredential);
  }

  private createForm(loginCredential: LoginCredential) {
    this.loginForm = new FormGroup({
      username: new FormControl(loginCredential.username, [Validators.required, Validators.maxLength(100)]),
      password: new FormControl(loginCredential.password, [Validators.required, Validators.maxLength(100)]),
    });
  }

  submitForm(formValues) {
    this.resetErrorHandling();

    if (!this.loginForm.valid) {
      return;
    }

    this.loginCredential.username = formValues.username;
    this.loginCredential.password = formValues.password;

    this.login();
  }

  private resetErrorHandling() {
    this.invalidLogin = false;
  }

  private login() {
    this.authService.login(this.loginCredential).subscribe(
      _ => {
        this.router.navigateByUrl(this.returnUrl);
      },
      error => {
        this.invalidLogin = true;
        throw error;
      }
    );
  }

  getUsernameErrorMessage() {
    const username = this.loginForm.controls.username;

    return username.hasError('required')
      ? 'Required'
      : username.hasError('maxlength')
        ? 'Max Length 100 characters'
        : '';
  }

  getPasswordErrorMessage() {
    const password = this.loginForm.controls.password;

    return password.hasError('required')
      ? 'Required'
      : password.hasError('maxlength')
        ? 'Max Length 100 characters'
        : '';
  }
}
