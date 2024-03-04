import { Component } from '@angular/core';
import { PocketbaseAuthService } from '../../../data/services/pocketbase-auth.service';
import { PocketbaseEmployeesService } from '../../../data/services/pocketbase-employees.service';
import { User } from '../../../data/interfaces/userinterface';

@Component({
  selector: 'app-employee-page',
  standalone: true,
  imports: [],
  templateUrl: './employee-page.component.html',
  styleUrl: './employee-page.component.scss',
})
export class EmployeePageComponent {
  employeeRecord: User = this.pbAuthService.model();
  constructor(
    private pbAuthService: PocketbaseAuthService,
    private pbEmployees: PocketbaseEmployeesService
  ) {}
}
