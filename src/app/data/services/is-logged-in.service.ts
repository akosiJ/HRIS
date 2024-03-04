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
    if (!this.pbAuth.isValid()) {
      return true;
    } else {
      if (this.pbAuth.model().role == 'admin') {
        this.router.navigateByUrl('admin/employees');
      }
      if (this.pbAuth.model().role == 'employee') {
        this.router.navigateByUrl('employee');
      }
      return false;
    }
  }
}
