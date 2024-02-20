import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AuthGuardService } from './auth-guard.service';
import { LoginPageComponent } from './login-page/login-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
];
