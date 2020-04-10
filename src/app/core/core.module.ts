import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent, UnauthorisedComponent } from './components';
import { AuthService, EnvironmentService } from './services';
import { MaterialModule } from 'shared/material.module';

@NgModule({
  declarations: [LoginComponent, UnauthorisedComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  providers: [AuthService, EnvironmentService]
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
