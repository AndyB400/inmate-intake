import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { LoginCredential } from 'shared/models';
import { EnvironmentService } from './environment.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _currentToken: string;

  private readonly currentTokenKey = 'currentToken';

  currentUserState = new BehaviorSubject(false);

  constructor(private http: HttpClient, private environmentService: EnvironmentService) {
    this.currentUserState.next(this.isAuthenticated());
  }

  login(loginCredential: LoginCredential) {
    return this.http
      .post<any>(`${this.environmentService.apiUrl}/auth`, {
        username: loginCredential.username,
        password: loginCredential.password,
      })
      .pipe(
        tap((result: any) => {
          this.setToken(Object.assign({}, result));
        })
      );
  }

  private setToken(result) {
    if (!result || !result.token) {
      return;
    }
    // store username and jwt token in session storage to keep user logged in between page refreshes
    sessionStorage.setItem(this.currentTokenKey, JSON.stringify({ token: result.token }));
  }

  logout() {
    // remove user from session storage to log user out
    sessionStorage.removeItem(this.currentTokenKey);
    this._currentToken = null;
    this.currentUserState.next(this.isAuthenticated());
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem(this.currentTokenKey);
  }

  get currentToken(): string {
    if (!this._currentToken && this.isAuthenticated()) {
      this._currentToken = JSON.parse(sessionStorage.getItem(this.currentTokenKey)).token;
    }

    return this._currentToken;
  }
}
