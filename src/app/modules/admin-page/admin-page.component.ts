import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeRecordsComponent } from './employee-records/employee-records.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    EmployeeRecordsComponent,
    MatIconModule,
    MatButtonModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent {
  isTimeLogsActive = false;
  isEmployeeRecordsActive = false;
  constructor(private router: Router) {}
  ngOnInit() {
    this.router.navigate(['admin/employees']);
  }
}
