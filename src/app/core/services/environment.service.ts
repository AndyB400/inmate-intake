import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  public production: boolean;
  public authApiUrl: string;
  public reCAPTCHASiteKey: string;

  constructor() {
    this.authApiUrl = environment.authApiUrl;
  }
}
