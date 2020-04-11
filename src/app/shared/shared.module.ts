import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InmateService } from './services';
import { AgeYearsPipe, JsonStringDatePipe } from './pipes';

@NgModule({
  declarations: [AgeYearsPipe, JsonStringDatePipe],
  imports: [
    CommonModule
  ],
  providers: [InmateService],
  exports: [AgeYearsPipe, JsonStringDatePipe]
})
export class SharedModule { }
