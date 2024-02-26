/*
- start getRecords on init

**/
import { Component, EventEmitter, Inject, ViewChild } from '@angular/core';
import { PocketbaseEmployeesService } from '../../db/pocketbase-employees.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { SnakeToTitlePipe } from '../../common/custompipes/snake-to-title.pipe';
import { ListResult, RecordModel } from 'pocketbase';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { provideNativeDateAdapter } from '@angular/material/core';
const ELEMENT_DATA = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
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
  ],
  templateUrl: './employee-records.component.html',
  styleUrl: './employee-records.component.scss',
})
export class EmployeeRecordsComponent {
  displayedColumns: string[] = [
    'first_name',
    'last_name',
    'mobile_number',
    'employee_id_number',
    'email_address',
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
      perPage: 5,
      totalItems: 0,
      totalPages: 0,
    };
  }

  ngOnInit() {
    this.getEmployeeRecords(1, 5);
  }
  createEmployeeRecord = () => {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      data: {
        title: 'Add new employee',
      },
      maxWidth: '60vw',
    });
  };
  handlePageEvent(event: PageEvent) {
    this.getEmployeeRecords(event.pageIndex + 1, event.pageSize);
  }
  getEmployeeRecords = (page: number, size: number) => {
    console.log('this is a new call');
    this.pbEmployees
      .getEmployeesRecords(page, size, '')
      .then((res) => {
        this.dataSource = res;
      })
      .catch((error) => {
        console.log(error.data);
      });
  };
}

@Component({
  selector: 'add-employee-dialog',
  templateUrl: './add-employee-dialog.html',
  styleUrl: './add-employee-dialog.scss',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSlideToggleModule,
  ],
  providers: [provideNativeDateAdapter()],
})
export class DialogContentExampleDialog {
  value: string = 'test ting one two three';
  employeeRecordsForm: FormGroup;
  todayDate: Date = new Date();
  dataSent = new EventEmitter<any>();
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogContentExampleDialog>,
    private pbEmployees: PocketbaseEmployeesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.employeeRecordsForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      employedDate: [new Date()],
      emailAddress: ['', [Validators.required, Validators.email]],
      mobileNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      isActive: [''],
      salaryRate: [''],
      employeeIdNumber: [{ value: '', disabled: true }],
    });
  }
  ngOnInit() {
    this.pbEmployees.generateIdNumber().then((res) => {
      this.employeeRecordsForm.patchValue({ employeeIdNumber: res });
    });
  }
  submitForm() {
    console.log(this.employeeRecordsForm);
  }

  onCloseClick() {
    this.dialogRef.close({ data: { action: 'closed' } });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
