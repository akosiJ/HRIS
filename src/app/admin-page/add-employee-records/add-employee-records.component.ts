import { Component, EventEmitter, Inject } from '@angular/core';
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
import { ViewEmployeeRecord } from '../../db/employee-record';

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
  value: string = 'test ting one two three';
  employeeRecordsForm: FormGroup;
  todayDate: Date = new Date();
  dataSent = new EventEmitter<any>();
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEmployeeRecordsComponent>,
    private pbEmployees: PocketbaseEmployeesService,
    @Inject(MAT_DIALOG_DATA) public data: any
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
    this.pbEmployees
      .generateIdNumber()
      .then((res) => {
        this.employeeRecordsForm.patchValue({ employeeIdNumber: res });
      })
      .catch((error) => {
        console.error(error.data);
      });
  }
  submitForm = async () => {
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
            this.dialogRef.close({ data: { ...res } });
          })
          .catch((error) => {
            console.error(error.data);
          });
      })
      .catch((error) => {
        console.error(error.data);
        this.employeeRecordsForm
          .get(Object.keys(error.data.data))
          ?.setErrors({ notUnique: true });
        return error;
      });
  };

  onCloseClick() {
    this.dialogRef.close({ data: { action: 'closed' } });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
