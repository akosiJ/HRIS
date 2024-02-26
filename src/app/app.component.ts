import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PocketbaseAuthService } from './db/pocketbase-auth.service';
import { CommonModule } from '@angular/common';
import { Observable, from } from 'rxjs';
import { RecordModel } from 'pocketbase';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'hr-app';
  authIcon = this.pbAuth.isValid() ? 'logout' : 'login';
  user$: Observable<RecordModel | any> = from(this.pbAuth.model());
  constructor(public pbAuth: PocketbaseAuthService, private route: Router) {}

  logout = async () => {
    await this.pbAuth.logout().then(() => {
      this.authIcon = 'login';
      this.route.navigate(['login']);
    });
  };

  routeHomePage = () => {
    this.route.navigate(['']);
  };

  routeAdminPage = () => {
    this.route.navigate(['admin']);
  };
}
