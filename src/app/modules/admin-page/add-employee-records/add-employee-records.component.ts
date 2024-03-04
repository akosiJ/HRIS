import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PocketbaseEmployeesService } from '../../db/pocketbase-employees.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  mobileNumberValidator,
  nameValidator,
} from '../../common/custom-validators/custom-validator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-employee-records',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSlideToggleModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-employee-records.component.html',
  styleUrl: './add-employee-records.component.scss',
})
export class AddEmployeeRecordsComponent {
  employeeRecordsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEmployeeRecordsComponent>,
    private pbEmployees: PocketbaseEmployeesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {
    this.employeeRecordsForm = this.fb.group({
      firstName: ['', [Validators.required, nameValidator]],
      middleName: ['', [Validators.required, nameValidator]],
      lastName: [''],
      dateOfBirth: [''],
      employedDate: [new Date(), [Validators.required]],
      emailAddress: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, mobileNumberValidator]],
      isActive: [true],
      salaryRate: [''],
      employeeIdNumber: [
        {
          value: '',
          readonly: true,
        },
      ],
    });
  }
  ngOnInit() {
    if (this.data.action == 'create') {
      this.generateIdNumber();
    }
    if (this.data.action == 'update') {
      this.employeeRecordsForm.patchValue({
        ...this.data,
        dateOfBirth: new Date(this.data.dateOfBirth),
        employedDate: new Date(this.data.employedDate),
      });
      this.employeeRecordsForm.markAsPristine();
    }
  }
  createEmployeeRecord = async () => {
    await this.pbEmployees
      .createEmployeeRecord(this.employeeRecordsForm.value)
      .then(async (res) => {
        await this.pbEmployees
          .createEmployeeLogin({
            email: res.emailAddress,
            emailVisibility: true,
            employeeRecord: res.id,
            name: `${res.firstName} ${res.middleName} ${res.lastName}`,
            username: `${res.employeeIdNumber}`,
            password: `${res.employeeIdNumber}`,
            passwordConfirm: `${res.employeeIdNumber}`,
            role: 'employee',
          })
          .then((res) => {
            this.toggleSnackBar(
              'Employee record successfully created',
              'close'
            );
            this.dialogRef.close();
          })
          .catch((error) => {
            console.error(error.data);
          });
      })
      .catch((error) => {
        this.employeeRecordsForm
          .get(Object.keys(error.data.data))
          ?.setErrors({ notUnique: true });
        return error;
      });
  };
  updateEmployeeRecord = () => {
    this.pbEmployees
      .updateEmployeeRecord(this.data.id, this.employeeRecordsForm)
      .then((res) => {
        if (res.id) {
          this.toggleSnackBar('Employee record successfully updated', 'close');
          this.dialogRef.close();
        }
      })
      .catch((error) => {
        if (Object.keys(error.data.data)) {
          this.employeeRecordsForm
            .get(Object.keys(error.data.data)[0])
            ?.setErrors({ notUnique: true });
        }
      });
  };

  generateIdNumber() {
    this.pbEmployees
      .generateIdNumber()
      .then((res) => {
        this.employeeRecordsForm.get('employeeIdNumber')?.patchValue(res);
      })
      .catch((error) => {
        console.error(error.data);
      });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  toggleSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['snackbar-success'],
    });
  }
}
