import { Component } from '@angular/core';
import { PocketbaseEmployeesService } from '../../db/pocketbase-employees.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { SnakeToTitlePipe } from '../../common/custompipes/snake-to-title.pipe';
import { ListResult, RecordModel } from 'pocketbase';
import { MatDialog } from '@angular/material/dialog';

import { AddEmployeeRecordsComponent } from '../add-employee-records/add-employee-records.component';
import { FullTitleCasePipe } from '../../common/custompipes/full-title-case.pipe';

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
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  search = new FormControl('', []);
  dataSource: ListResult<RecordModel>;

  //@ViewChild(MatPaginator) paginator: MatPaginator;

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
    this.getEmployeeRecords(1, 25);
  }
  createEmployeeRecord = () => {
    const dialogRef = this.dialog
      .open(AddEmployeeRecordsComponent, {
        data: {
          title: 'Add new employee',
        },
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          console.error(data);
        }
      });
  };
  handlePageEvent(event: PageEvent) {
    this.getEmployeeRecords(event.pageIndex + 1, event.pageSize);
  }
  getEmployeeRecords = (page: number, size: number) => {
    this.pbEmployees
      .getEmployeesRecords(page, size, '')
      .then((res) => {
        this.dataSource = res;
      })
      .catch((error) => {
        console.error(error.data);
      });
  };
}
