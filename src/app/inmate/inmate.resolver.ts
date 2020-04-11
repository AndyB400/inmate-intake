import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { InmateService } from 'shared/services';

@Injectable()
export class InmateResolver implements Resolve<any> {
  constructor(private inmateService: InmateService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.inmateService.get(route.params.id).pipe(
      map(inmate => {
        if (inmate) {
          return inmate;
        } else {
          this.router.navigate(['/404']);
        }
      })
    );
  }
}
