import { Injectable, signal } from '@angular/core';
import PocketBase, { RecordModel } from 'pocketbase';
import { environment } from '../../environment/environment.development';
import { User } from '../interfaces/userinterface';
import { HttpErrorResponse } from '@angular/common/http';
const pb = new PocketBase(environment.pocketbase.url);
@Injectable({
  providedIn: 'root',
})
export class PocketbaseAuthService {
  constructor() {}
  userRecord: any;
  login = async (username: string, password: string) => {
    try {
      const res = await pb
        .collection('users')
        .authWithPassword(username, password);
      return res;
    } catch (error: any) {
      throw error;
    }
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
