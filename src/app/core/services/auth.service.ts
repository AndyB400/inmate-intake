import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { User, LoginCredential } from 'shared/models';
import { EnvironmentService } from '.';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _currentUser: User;
  private _currentToken: string;

  private readonly currentTokenKey = 'currentToken';
  private readonly currentUserKey = 'currentUser';

  currentUserState = new BehaviorSubject(false);

  constructor(private http: HttpClient, private environmentService: EnvironmentService) {
    this.currentUserState.next(this.isAuthenticated());
  }

  login(loginCredential: LoginCredential) {
    return this.http
      .post<any>(this.environmentService.authApiUrl, {
        username: loginCredential.username,
        password: loginCredential.password,
      })
      .pipe(
        map((result: any) => {
          this.setToken(result);
          this.currentUserState.next(this.isAuthenticated());
        })
      );
  }

  private setToken(result) {
    if (!result || !result.token || !result.user) {
      return;
    }
    // store username and jwt token in session storage to keep user logged in between page refreshes
    sessionStorage.setItem(this.currentTokenKey, JSON.stringify({ username: result.user.username, token: result.token }));
    sessionStorage.setItem(this.currentUserKey, JSON.stringify({ username: result.user.username, user: result.user }));
  }

  logout() {
    // remove user from session storage to log user out
    sessionStorage.removeItem(this.currentUserKey);
    sessionStorage.removeItem(this.currentTokenKey);
    this._currentUser = null;
    this._currentToken = null;
    this.currentUserState.next(this.isAuthenticated());
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem(this.currentTokenKey);
  }

  get currentUser(): User {
    if (!this._currentUser && this.isAuthenticated()) {
      this._currentUser = JSON.parse(sessionStorage.getItem(this.currentUserKey)).user;
    }

    return this._currentUser;
  }

  get currentToken(): string {
    if (!this._currentToken && this.isAuthenticated()) {
      this._currentToken = JSON.parse(sessionStorage.getItem(this.currentTokenKey)).token;
    }

    return this._currentToken;
  }
}
