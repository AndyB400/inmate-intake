import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';

import { MaterialModule } from 'shared/material.module';
import { SharedModule } from 'shared/shared.module';
import { InmateResolver } from './inmate.resolver';
import { InmateRoutingModule } from './inmate-routing.module';
import { EditComponent, LocationHistoriesComponent } from './components';
import { HourMinutePipe } from './pipes';

@NgModule({
  declarations: [EditComponent, LocationHistoriesComponent, HourMinutePipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    InmateRoutingModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    NgxMatMomentModule
  ],
  providers: [InmateResolver, HourMinutePipe]
})
export class InmateModule { }
