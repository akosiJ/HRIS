import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuardService } from './service/auth-guard.service';
import { IsLoggedInService } from './service/is-logged-in.service';
import { EmployeeRecordsComponent } from './admin-page/employee-records/employee-records.component';
import { TimeLogsComponent } from './admin-page/time-logs/time-logs.component';
export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    canActivate: [IsLoggedInService],
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'employees',
        component: EmployeeRecordsComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'time-logs',
        component: TimeLogsComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [IsLoggedInService],
  },
];
