import { Component } from '@angular/core';
import { PocketbaseAuthService } from '../../../data/services/pocketbase-auth.service';
import { PocketbaseEmployeesService } from '../../../data/services/pocketbase-employees.service';
import { User } from '../../../data/interfaces/userinterface';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-employee-page',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatIconModule, MatButtonModule],
  templateUrl: './employee-page.component.html',
  styleUrl: './employee-page.component.scss',
})
export class EmployeePageComponent {
  employeeRecord: User = this.pbAuthService.model();
  constructor(
    private pbAuthService: PocketbaseAuthService,
    private pbEmployees: PocketbaseEmployeesService
  ) {}
  ngOnInit() {
    console.log('test');
  }
}
