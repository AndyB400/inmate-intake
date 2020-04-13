import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';

import { Inmate } from 'shared/models';
import { InmateService } from 'shared/services';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DATETIME_FORMATS } from '@mat-datetimepicker/core';

@Component({
  selector: 'ii-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  form: FormGroup;
  inmate: Inmate;
  editMode = false;
  ageYears: string;

  // Validation
  private firstNamesMaxLength = 250;
  private lastNameMaxLength = 250;
  cellNumberMin = 1;
  cellNumberMax = 2000;
  dobMin: moment.Moment;
  dobMax: moment.Moment;
  intakeMin: moment.Moment;
  intakeMax: moment.Moment;

  constructor(
    private router: Router, private route: ActivatedRoute,
    private inmateService: InmateService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.setDateValidationValues();

    this.route.data.forEach((data: Data) => {
      this.inmate = data.inmate as Inmate;
    });

    if (!this.inmate) {
      this.inmate = {
        id: undefined,
        firstNames: '',
        lastName: '',
        dob: null,
        cellNumber: null,
        intakeDate: null,
        isActive: true,
        locationHistory: []
      };
    }

    this.createForm(this.inmate);
  }

  private setDateValidationValues() {
    // DOB
    this.dobMin = moment().subtract(100, 'years');
    this.dobMax = moment().subtract(14, 'years');

    // Intake
    this.intakeMin = moment().subtract(10, 'years');
    this.intakeMax = moment();
  }

  private createForm(inmate: Inmate) {
    this.form = new FormGroup({
      firstNames: new FormControl(inmate.firstNames, [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9].*'),
        Validators.maxLength(this.firstNamesMaxLength)
      ]),
      lastName: new FormControl(inmate.lastName, [Validators.required,
      Validators.pattern('[a-zA-Z0-9].*'),
      Validators.maxLength(this.lastNameMaxLength)
      ]),
      dob: new FormControl(inmate.dob, [Validators.required]),
      cellNumber: new FormControl(inmate.cellNumber, [
        Validators.required,
        Validators.min(this.cellNumberMin),
        Validators.max(this.cellNumberMax)
      ]),
      intakeDate: new FormControl(inmate.intakeDate),
      isActive: new FormControl(inmate.isActive)
    });
  }

  formatAge(type: string, event: MatDatepickerInputEvent<Date>) {
    const now = new Date();
    const dob = new Date(event.value);

    this.ageYears = ((now.getTime() - dob.getTime()) / 31536000000).toFixed(0);
  }

  saveChanges(formValues) {
    console.log(this.form);

    if (this.form.invalid) {
      return;
    }

    this.inmate.firstNames = formValues.firstNames;
    this.inmate.lastName = formValues.lastName;

    this.inmate.dob = moment(formValues.dob);
    this.inmate.cellNumber = formValues.cellNumber;
    this.inmate.intakeDate = moment(formValues.intake);
    this.inmate.isActive = formValues.isActive;

    this.save(this.inmate);
  }

  getFirstNamesErrorMessage() {
    const control = this.form.controls.firstNames;

    return control.hasError('required')
      ? 'Required'
      : control.hasError('pattern')
        ? 'Invalid'
        : control.hasError('maxLength')
          ? `Cannot be more that ${this.firstNamesMaxLength} characters`
          : '';
  }

  getLastNameErrorMessage() {
    const control = this.form.controls.lastName;

    return control.hasError('required')
      ? 'Required'
      : control.hasError('pattern')
        ? 'Invalid'
        : control.hasError('maxLength')
          ? `Cannot be more that ${this.lastNameMaxLength} characters`
          : '';
  }

  getCellNumberErrorMessage() {
    const control = this.form.controls.cellNumber;

    return control.hasError('required')
      ? 'Required'
      : control.hasError('min')
        ? `Minimum ${this.cellNumberMin}`
        : control.hasError('max')
          ? `Maximum ${this.cellNumberMax}`
          : '';
  }

  private save(inmate: Inmate) {
    this.inmateService.save(inmate).subscribe(
      result => {
        this.snackBar.open('Saved successfully', '', {
          duration: 2000,
        });

        // Back to previous form
        this.router.navigate(['../home', { relativeTo: this.route }]);
      },
      error => {
        console.log(error);

        this.snackBar.open('Unable to save. Please try again', '', {
          duration: 2000,
        });
      }
    );
  }
}
