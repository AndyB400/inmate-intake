import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'jsonStringDate'
})
export class JsonStringDatePipe extends
  DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(new Date(value), 'd-MMM-yy');
  }
}
