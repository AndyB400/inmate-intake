import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormGroupDirective, FormGroup } from '@angular/forms';
import { MAT_DATETIME_FORMATS } from '@mat-datetimepicker/core';
import * as moment from 'moment';
import { MomentDatetimeAdapter } from '@mat-datetimepicker/moment';

import { LocationHistory } from 'shared/models';

@Component({
  selector: 'ii-location-histories',
  templateUrl: './location-histories.component.html',
  styleUrls: ['./location-histories.component.scss']
})
export class LocationHistoriesComponent implements OnInit {
  @Input() locationHistories: LocationHistory[];
  @Output() add = new EventEmitter<LocationHistory>();

  @ViewChild(FormGroupDirective) myForm;
  form: FormGroup;

  newLocationHistory: LocationHistory;
  showNewLocationHistoryForm = false;
  filteredLocationHistories: LocationHistory[] = [];
  showRemovedLocationHistory = false;

  constructor() { }


  ngOnInit(): void {
  }

  toggleShowRemovedLocationHistories() {
    this.filterLocationHistories();
  }

  filterLocationHistories() {
    if (this.locationHistories) {

      this.filteredLocationHistories = this.locationHistories.filter((locationHistory: LocationHistory) => {
        return !this.showRemovedLocationHistory ? locationHistory.isActive : true;
      });
    }
  }

  removeLocationHistory(locationHistory: LocationHistory) {
    const index = this.locationHistories.indexOf(locationHistory, 0);

    if (index > -1) {
      this.locationHistories[index].isActive = !this.locationHistories[index].isActive;
      this.filterLocationHistories();
    }
  }
  toggleNewLocationHistory() {
    this.form.reset();
    this.resetNewLocationHistory();
    this.toggle();
  }

  private resetNewLocationHistory() {
    this.newLocationHistory = {
      id: 0,
      location: '',
      timestamp: moment(),
      isActive: true
    };
  }

  cancelChanges() {
    this.resetNewLocationHistory();
    this.toggle();
  }

  toggle() {
    this.showNewLocationHistoryForm = !this.showNewLocationHistoryForm;
  }

  getLocationErrorMessage() {
    const name = this.form.controls.name;

    return name.hasError('required')
      ? 'Required'
      : name.hasError('maxlength')
        ? 'Max 100 Characters'
        : '';
  }

  validateNewLocationHistory(formValues: any, formDirective: FormGroupDirective) {
    if (this.form.invalid) {
      return;
    }

    this.newLocationHistory.location = formValues.location;
    this.newLocationHistory.timestamp = moment(formValues.timestamp);

    this.createNewLocationHistory(this.newLocationHistory);
    formDirective.resetForm();
  }

  private createNewLocationHistory(locationHistory: LocationHistory) {
    const tempLocationHistory = Object.assign({}, locationHistory);
    this.locationHistories.push(tempLocationHistory);

    this.filterLocationHistories();
    this.toggle();
  }
}
