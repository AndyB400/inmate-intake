import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'hourMinutePipe'
})
export class HourMinutePipe implements PipeTransform {
    transform(value: Date|moment.Moment, ...args: any[]): any {
        const [format] = args;
        return moment(value).format(format);
    }
}
