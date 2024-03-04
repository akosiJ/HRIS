import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PocketbaseTimelogService } from '../db/pocketbase-timelog.service';
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  @ViewChild('video') videoElement: ElementRef<HTMLVideoElement> | null = null;
  @ViewChild('image') imageElement: ElementRef<HTMLImageElement>;
  emailAddress = new FormControl('', [Validators.required, Validators.email]);
  stream: MediaStream | null = null;
  hasError: boolean = false;
  manualTimeLog: boolean = false;
  constructor(
    private pbTimelog: PocketbaseTimelogService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        if (this.videoElement) {
          this.videoElement.nativeElement.srcObject = stream;
        }
        this.stream = stream;
        // ... handle stream
      })
      .catch((error) => {
        this.hasError = true;
        console.error('Error accessing camera:', error);
      });
  }

  toggleManualTimeLog = () => {
    this.manualTimeLog = !this.manualTimeLog;
    this._snackBar.dismiss();
  };

  processTimeLog = () => {
    this.emailAddress.markAsTouched({ onlySelf: true });
    this.pbTimelog
      .createTimeLog(this.emailAddress.value)
      .then((res: any) => {
        if (res) {
          if (res['success'] == 'timeIn') {
            this.toggleManualTimeLog();
            this.emailAddress.reset();
            this.openSnackBar('Time in success', 'Confirm');
          }
          if (res['success'] == 'timeOut') {
            this.toggleManualTimeLog();
            this.emailAddress.reset();
            this.openSnackBar('Time out success', 'Confirm');
          }
          if (JSON.stringify(res.data) === '{}') {
            this.emailAddress.setErrors({ somethingWentWrong: true });
          }
        }
      })
      .catch((error) => {
        if (error.data.code == 400) {
          this.emailAddress.setErrors({ notFound: true });
        }
        if (JSON.stringify(error.data) === '{}') {
          this.emailAddress.setErrors({ somethingWentWrong: true });
        }
      });
  };
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      politeness: 'assertive',
    });
  }
  captureImage() {
    if (this.stream) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (context && this.videoElement) {
        canvas.width = this.videoElement?.nativeElement.videoWidth || 0;
        canvas.height = this.videoElement?.nativeElement.videoHeight || 0;
        context.drawImage(this.videoElement.nativeElement, 0, 0);

        const dataURL = canvas.toDataURL('image/png');
        this.imageElement.nativeElement.srcset = dataURL; // Adjust format as needed
        // Handle the captured image data (e.g., download, display, send to server)
        console.log('Captured image:', dataURL); // Example logging
      } else {
        console.error('Failed to get context from canvas');
      }
    } else {
      console.error('No active stream to capture image from');
    }
  }
}
