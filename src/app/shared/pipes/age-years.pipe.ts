import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ageYearsDate'
})
export class AgeYearsPipe implements PipeTransform {
  transform(value: any, args?: any): any {

    const now = new Date();
    const dob = new Date(value);

    return ((now.getTime() - dob.getTime()) / 31536000000).toFixed(0);
  }
}
