import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InmateService } from './services';
import { AgeYearsPipe, HourMinutePipe, JsonStringDatePipe } from './pipes';

@NgModule({
  declarations: [AgeYearsPipe, HourMinutePipe, JsonStringDatePipe],
  imports: [
    CommonModule
  ],
  providers: [InmateService],
  exports: [AgeYearsPipe, HourMinutePipe, JsonStringDatePipe]
})
export class SharedModule { }
