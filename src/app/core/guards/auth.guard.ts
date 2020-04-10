import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, UrlSegment } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from 'core/services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private authService: AuthService, private location: Location) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canAccess(state.url);
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.canAccess(this.location.path());
  }

  private canAccess(path: string) {
    if (this.authService.isAuthenticated()) {
      // logged in so return true
      return true;
    }

    // Don't redirect to /unauthorised after login
    if (path === '/unauthorised') {
      this.navigateToLogin(path);
      return false;
    }

    this.navigateToLogin(path);
    return false;
  }

  private navigateToLogin(path: string) {
    this.router.navigate(['/login'], { queryParams: { returnUrl: path } });
  }
}
