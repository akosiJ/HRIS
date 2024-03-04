import { Component, ViewChild } from '@angular/core';
import {
  PocketbaseEmployeesService,
  TableActions,
} from '../../../data/services/pocketbase-employees.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { SnakeToTitlePipe } from '../../../shared/pipes/snake-to-title.pipe';
import { ListResult, RecordModel } from 'pocketbase';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeRecordsComponent } from '../add-employee-records/add-employee-records.component';
import { FullTitleCasePipe } from '../../../shared/pipes/full-title-case.pipe';
import { DatePipe, AsyncPipe } from '@angular/common';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
@Component({
  selector: 'app-employee-records',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    SnakeToTitlePipe,
    FullTitleCasePipe,
    DatePipe,
    MatSortModule,
    AsyncPipe,
  ],
  templateUrl: './employee-records.component.html',
  styleUrl: './employee-records.component.scss',
})
export class EmployeeRecordsComponent {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'mobileNumber',
    'employeeIdNumber',
    'emailAddress',
    'employedDate',
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  search = new FormControl('', []);
  dataSource: ListResult<RecordModel>;
  tableControl: TableActions = {
    pageIndex: 1,
    pageSize: 25,
    active: 'created',
    direction: 'desc',
    length: 0,
    previousPageIndex: 0,
  };

  //@ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private pbEmployees: PocketbaseEmployeesService,
    public dialog: MatDialog
  ) {
    this.dataSource = {
      items: [],
      page: 1,
      perPage: 25,
      totalItems: 0,
      totalPages: 0,
    };
  }
  ngOnInit() {
    this.getEmployeeRecords();
  }
  getEmployeeRecords = () => {
    return this.pbEmployees
      .getEmployeesRecords(this.tableControl)
      .then((res) => {
        this.dataSource = res;
      })
      .catch((error) => {
        console.error(error.data);
      });
  };

  createEmployeeRecord = (element?: any) => {
    const dialogRef = this.dialog.open(AddEmployeeRecordsComponent, {
      data: {
        action: 'create',
        dialogTitleMessage: 'Create new employee record',
      },
    });
  };

  editEmployeeRecords = (element: any) => {
    const dialogRef = this.dialog.open(AddEmployeeRecordsComponent, {
      data: {
        ...element,
        action: 'update',
        dialogTitleMessage: 'Update employee record',
      },
    });
  };

  tableEvent(event: Sort | PageEvent) {
    this.tableControl = { ...this.tableControl, ...event };
    this.getEmployeeRecords();
  }
}
