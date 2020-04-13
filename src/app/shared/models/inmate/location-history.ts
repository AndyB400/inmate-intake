import * as moment from 'moment';

export interface LocationHistory {
  id: 0;
  timestamp: moment.Moment;
  location: string;
  isActive: boolean;
}
