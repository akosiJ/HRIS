import { Injectable } from '@angular/core';
import PocketBase, { RecordModel } from 'pocketbase';
import { environment } from '../environment/environment.development';

const pb = new PocketBase(environment.pocketbase.url);
@Injectable({
  providedIn: 'root',
})
export class PocketbaseAuthService {
  userRecord: RecordModel | any;
  constructor() {}

  login = async (username: string, password: string) => {
    return await pb
      .collection('users')
      .authWithPassword(username, password)
      .then((res) => {
        this.userRecord = res.record;
      });
  };

  logout = async () => {
    return await pb.authStore.clear();
  };

  token = async () => {
    return await pb.authStore.token;
  };

  isValid = () => {
    return pb.authStore.isValid;
  };

  isAdmin = () => {
    return pb.authStore.isAdmin;
  };
}
