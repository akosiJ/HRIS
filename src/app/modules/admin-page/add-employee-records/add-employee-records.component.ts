import { Component, Inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
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
import { PocketbaseEmployeesService } from '../../../data/services/pocketbase-employees.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  mobileNumberValidator,
  nameValidator,
} from '../../../shared/custom-validators/custom-validator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AsyncPipe } from '@angular/common';
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
    MatTooltipModule,
    AsyncPipe,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-employee-records.component.html',
  styleUrl: './add-employee-records.component.scss',
})
export class AddEmployeeRecordsComponent {
  employeeRecordsForm: FormGroup;
  imagePreviewList: Array<any>;
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
      employeeImage: new FormArray([]),
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
    //create a preview of image uploaded
    this.employeeRecordsForm
      .get('employeeImage')
      ?.valueChanges.pipe(debounceTime(500))
      .subscribe((res: Array<File>) => {});
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
  async previewImage(event: any) {
    if (event.target.files.length > 0) {
      const control = <FormArray>this.employeeRecordsForm.get('employeeImage');
      for (const [key, value] of Object.entries<File>(event.target.files)) {
        control.push(this.fb.control(value));
      }
      control.markAsDirty();
      await this.fileListToBase64(control.value).then(
        (res) => (this.imagePreviewList = res)
      );
    }
  }
  readImageBase64(file: File) {
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = (e) => {
        resolve(e.target?.result);
      };
      reader.readAsDataURL(file);
    });
  }
  fileListToBase64 = async (fileList: Array<File>) => {
    const promises = [];
    for (let image of fileList) {
      promises.push(this.readImageBase64(image));
    }
    return await Promise.all(promises);
  };
  imageDelete(index: any) {
    const control = <FormArray>this.employeeRecordsForm.get('employeeImage');

    control.removeAt(index);
    this.imagePreviewList.splice(index, 1);
  }
}
