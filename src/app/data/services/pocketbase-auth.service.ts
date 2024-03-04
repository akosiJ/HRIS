import { Injectable, signal } from '@angular/core';
import PocketBase, { RecordModel } from 'pocketbase';
import { environment } from '../../environment/environment.development';
import { User } from '../interfaces/userinterface';
const pb = new PocketBase(environment.pocketbase.url);
@Injectable({
  providedIn: 'root',
})
export class PocketbaseAuthService {
  constructor() {}
  userRecord: any;
  login = async (username: string, password: string) => {
    return await pb
      .collection('users')
      .authWithPassword(username, password)
      .then((res) => {
        this.userRecord = res;
      });
  };

  logout = async () => {
    return await pb.authStore.clear();
  };

  token = async () => {
    return await pb.authStore.token;
  };

  model = () => {
    return pb.authStore.model as User;
  };

  isValid = () => {
    return pb.authStore.isValid;
  };

  isAdmin = () => {
    return pb.authStore.isAdmin;
  };
}
