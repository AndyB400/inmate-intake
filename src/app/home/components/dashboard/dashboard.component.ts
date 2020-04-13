import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';

import { Inmate } from 'shared/models';
import { InmateService } from 'shared/services';

@Component({
  selector: 'ii-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading = false;
  inmates: Inmate[] = [];
  private activeToggle = true;
  private filterValue = '';

  displayedColumns: string[] = ['firstNames', 'lastName', 'age', 'intakeDate', 'cellNumber'];
  dataSource: MatTableDataSource<Inmate>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private inmateService: InmateService, private snackBar: MatSnackBar) { }

  get isActiveToggle(): boolean {
    return this.activeToggle;
  }
  set isActiveToggle(value: boolean) {
    this.activeToggle = value;
    this.applyFilter(this.listFilter, this.isActiveToggle);
  }

  get listFilter(): string {
    return this.filterValue;
  }
  set listFilter(value: string) {
    this.filterValue = value;
    this.applyFilter(this.listFilter, this.isActiveToggle);
  }

  ngOnInit() {
    this.loadInmates();
  }

  loadInmates() {
    this.loading = true;
    this.inmateService.getAll().pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: results => {
        this.inmates = results;
        this.applyFilter(this.filterValue, this.isActiveToggle);
      },
      error: error => {
        console.log(error);
        this.snackBar.open('Unable to load inmates', '', {
          duration: 2000
        });
      }
    });
  }

  bindTable(inmates: Inmate[]) {
    this.dataSource = new MatTableDataSource(inmates);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator.firstPage();
  }

  applyFilter(filterValue: string, showActive: boolean) {
    filterValue = filterValue.toLocaleLowerCase();

    const filtered = this.inmates.filter((item: Inmate) => {
      return (item.firstNames.toLocaleLowerCase().indexOf(filterValue) !== -1 ||
        item.lastName.toLocaleLowerCase().indexOf(filterValue) !== -1  ||
        item.cellNumber.toString().indexOf(filterValue) !== -1)
        && (showActive ? item.isActive : true);
    });

    this.bindTable(filtered);
  }
}
