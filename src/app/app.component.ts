import { Component } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  RouterOutlet,
  Routes,
} from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PocketbaseAuthService } from './data/services/pocketbase-auth.service';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    RouterModule,
    MatTooltipModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'hr-app';
  constructor(
    public pbAuth: PocketbaseAuthService,
    private router: Router,
    private _route: ActivatedRoute
  ) {}
  knownRoutes: Routes;
  logout = async () => {
    await this.pbAuth.logout().then(() => {
      this.router.navigate(['login']);
    });
  };

  routeHomePage = () => {
    this.router.navigate(['']);
  };

  routeAdminPage = () => {
    this.router.navigate(['admin']);
  };
}
