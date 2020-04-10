import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginComponent, NavBarComponent, UnauthorisedComponent } from './components';
import { AuthService, EnvironmentService } from './services';
import { MaterialModule } from 'shared/material.module';

@NgModule({
  declarations: [LoginComponent, UnauthorisedComponent, NavBarComponent],
  imports: [CommonModule, RouterModule, MaterialModule, ReactiveFormsModule],
  providers: [AuthService, EnvironmentService],
  exports: [NavBarComponent]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
