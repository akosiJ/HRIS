import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { PocketbaseAuthService } from '../../data/services/pocketbase-auth.service';
import { Router } from '@angular/router';
import { RecordAuthResponse, RecordModel } from 'pocketbase';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  hide = true;
  loginForm: FormGroup;
  userRecord: RecordModel | '' = '';
  constructor(
    private fb: FormBuilder,
    private pbAuthService: PocketbaseAuthService,
    private route: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login = async () => {
    this.pbAuthService
      .login(this.loginForm.value?.username, this.loginForm.value?.password)
      .then((res) => {
        this.route.navigate(['']);
      })
      .catch((error) => {
        this.loginForm.setErrors({ failed: true });
        this.loginForm.get('password')?.setErrors({ valid: false });
      });
  };
}
