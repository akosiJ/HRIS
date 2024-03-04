import { Routes } from '@angular/router';
import { LandingPageComponent } from './modules/landing-page/landing-page.component';
import { AdminPageComponent } from './modules/admin-page/admin-page.component';
import { LoginPageComponent } from './modules/login-page/login-page.component';
import { AuthGuardService } from './data/services/auth-guard.service';
import { IsLoggedInService } from './data/services/is-logged-in.service';
import { EmployeeRecordsComponent } from './modules/admin-page/employee-records/employee-records.component';
import { TimeLogsComponent } from './modules/admin-page/time-logs/time-logs.component';
import { EmployeePageComponent } from './modules/employee-page/employee-page/employee-page.component';
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
    data: {
      role: 'admin',
    },
    children: [
      {
        path: 'employees',
        component: EmployeeRecordsComponent,
      },
      {
        path: 'time-logs',
        component: TimeLogsComponent,
      },
    ],
  },
  {
    path: 'employee',
    component: EmployeePageComponent,
    canActivate: [AuthGuardService],
    data: {
      role: 'employee',
    },
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [IsLoggedInService],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
