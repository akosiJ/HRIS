import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import PocketBase from 'pocketbase';
import { environment } from '../../environment/environment.development';
import { PocketbaseAuthService } from './pocketbase-auth.service';

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
    let url: string = state.url;
    if (this.pbAuth.isValid()) {
      return this.pbAuth.model().role == route.data['role'];
    }
    return false;
  }
}
