import { Component } from '@angular/core';
import { PocketbaseAuthService } from '../../../data/services/pocketbase-auth.service';
import { PocketbaseEmployeesService } from '../../../data/services/pocketbase-employees.service';

@Component({
  selector: 'app-employee-page',
  standalone: true,
  imports: [],
  templateUrl: './employee-page.component.html',
  styleUrl: './employee-page.component.scss',
})
export class EmployeePageComponent {
  constructor(
    private pbAuthService: PocketbaseAuthService,
    private pbEmployees: PocketbaseEmployeesService
  ) {}
  ngOnInit() {
    console.log(this.pbAuthService.userRecord);
    this.pbEmployees
      .getOneSelfRecord(this.pbAuthService.model().employeeRecord)
      .then((res) => {
        console.log(res);
      });
  }
}
