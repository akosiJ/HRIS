import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { PocketbaseAuthService } from '../db/pocketbase-auth.service';

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
      this.router.navigate(['admin']);
      return false;
    }
  }
}
