import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  public production: boolean;
  public apiUrl: string;

  constructor() {
    this.apiUrl = environment.apiUrl;
  }
}
