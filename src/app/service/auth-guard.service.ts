import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import PocketBase from 'pocketbase';
import { environment } from '../environment/environment.development';
import { PocketbaseAuthService } from '../db/pocketbase-auth.service';

const pb = new PocketBase(environment.pocketbase.url);

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private router: Router, private pbAuth: PocketbaseAuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.pbAuth.isValid()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
