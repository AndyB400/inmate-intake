import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormGroupDirective, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DATETIME_FORMATS } from '@mat-datetimepicker/core';
import * as moment from 'moment';
import { MomentDatetimeAdapter } from '@mat-datetimepicker/moment';

import { LocationHistory } from 'shared/models';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'ii-location-histories',
  templateUrl: './location-histories.component.html',
  styleUrls: ['./location-histories.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('300ms ease-in-out', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('300ms ease-in-out', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class LocationHistoriesComponent implements OnInit {
  @Input() locationHistories: LocationHistory[];
  @ViewChild(FormGroupDirective) myForm;
  form: FormGroup;

  newLocationHistory: LocationHistory;
  showNewLocationHistoryForm = false;
  filteredLocationHistories: LocationHistory[] = [];
  showRemovedLocationHistory = false;

  // Validation
  private locationMaxLength = 100;

  constructor() { }

  ngOnInit(): void {
    if (!this.locationHistories) {
      this.locationHistories = [];
    }

    this.filterLocationHistories();
    this.resetNewLocationHistory();

    this.createForm(this.newLocationHistory);
  }

  private createForm(locationHistory: LocationHistory) {
    this.form = new FormGroup({
      location: new FormControl(locationHistory.location, [
        Validators.required,
        Validators.maxLength(this.locationMaxLength)
      ]),
      timestamp: new FormControl(locationHistory.timestamp)
    });
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

  deactivate(locationHistory: LocationHistory) {
    locationHistory.isActive = !locationHistory.isActive;
    this.filterLocationHistories();
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
    const control = this.form.controls.location;

    return control.hasError('required')
      ? 'Required'
      : control.hasError('maxlength')
        ? `Max ${this.locationMaxLength} Characters`
        : '';
  }

  validateNewLocationHistory(formValues: any, formDirective: FormGroupDirective) {
    if (this.form.invalid) {
      return;
    }

    this.newLocationHistory.location = formValues.location;
    console.log(formValues.timestamp);
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
