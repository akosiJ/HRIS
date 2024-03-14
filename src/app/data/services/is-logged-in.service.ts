import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { PocketbaseAuthService } from './pocketbase-auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedInService {
  constructor(private pbAuth: PocketbaseAuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.pbAuth.isValid()) {
      return this.pbAuth
        .token()
        .then((res) => {
          if (this.pbAuth.model().role == 'admin') {
            this.router.navigateByUrl('admin/employees');
          }
          if (this.pbAuth.model().role == 'employee') {
            this.router.navigateByUrl('employee');
          }
          if (this.pbAuth.model().role == 'timein-admin') {
            this.router.navigateByUrl('employee-timein');
          }
          return false;
        })
        .catch((err) => {
          return true;
        });
    }
    return true;
  }
}
