import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'ii-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading = false;
  inmates: Inmate[] = [];

  displayedColumns: string[] = ['name', 'breed', 'customer', 'nextAppointment', 'lastAppointment'];
  dataSource: MatTableDataSource<Inmate>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private inmateService: InmateService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  loadinmates() {
    this.loading = true;
    this.inmateService.getAll().pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: results => {
        this.inmates = results;
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
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
