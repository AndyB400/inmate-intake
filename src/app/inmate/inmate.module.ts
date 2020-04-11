import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'shared/material.module';
import { SharedModule } from 'shared/shared.module';
import { InmateResolver } from './inmate.resolver';
import { InmateRoutingModule } from './inmate-routing.module';
import { EditComponent } from './components';

@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, SharedModule, InmateRoutingModule
  ],
  providers: [InmateResolver]
})
export class InmateModule { }
