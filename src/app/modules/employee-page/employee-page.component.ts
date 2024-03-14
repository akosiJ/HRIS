import { Component, LOCALE_ID } from '@angular/core';
import { PocketbaseAuthService } from '../../data/services/pocketbase-auth.service';
import { PocketbaseEmployeesService } from '../../data/services/pocketbase-employees.service';
import { User } from '../../data/interfaces/userinterface';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  DatePipe,
  AsyncPipe,
  registerLocaleData,
  TitleCasePipe,
} from '@angular/common';
import localeEn from '@angular/common/locales/en-PH';
import localeEnExtra from '@angular/common/locales/extra/en-PH';
registerLocaleData(localeEn, 'en-PH', localeEnExtra); // Replace with your desired locale variant if needed
@Component({
  selector: 'app-employee-page',
  standalone: true,
  providers: [{ provide: LOCALE_ID, useValue: 'en-PH' }],
  imports: [
    RouterOutlet,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    DatePipe,
    AsyncPipe,
    TitleCasePipe,
  ],
  templateUrl: './employee-page.component.html',
  styleUrl: './employee-page.component.scss',
})
export class EmployeePageComponent {
  employeeRecord: User = this.pbAuthService.model();
  dateToday = new Date();
  intervalId: number | any | undefined;
  employeeName: string | null;
  constructor(
    public pbAuthService: PocketbaseAuthService,
    private pbEmployees: PocketbaseEmployeesService
  ) {}
  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.dateToday = new Date();
    }, 60000); // Update every second
  }
}
