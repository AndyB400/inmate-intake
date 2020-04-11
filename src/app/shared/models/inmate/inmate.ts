import { LocationHistory } from './location-history';

export interface Inmate {
  id: number;
  firstNames: string;
  lastName: string;
  dob: Date;
  cellNumber: number;
  intake: Date;
  isActive: boolean;
  locationHistory: LocationHistory[];
}

/* JSON Generator Formula

{
  "inmates": [
    '{{repeat(5, 500)}}',
    {
      id: '{{index()}}',
      firstNames: '{{firstName()}}',
      lastName: '{{surname()}}',
      dob: '{{date(new Date(1950, 0, 1), new Date(2000, 0, 1), "YYYY-MM-ddThh:mm:ss Z")}}',
      cellNumber: '{{integer(1, 400)}}',
      intakeDate: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
      isActive: '{{bool()}}',
      locationHistory: [
        '{{repeat(0,5)}}',
        {
          id: '{{index()}}',
          location: '{{random("In cell", "Cafeteria", "Gym", "Kitchen", "Visitors Room", "Phone", "Infirmary")}}',
          timestamp: '{{date(new Date(2020, 3, 9), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}'
        }
      ]
    }
  ]
}

*/
