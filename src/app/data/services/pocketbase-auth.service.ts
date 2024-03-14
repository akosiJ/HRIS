import { Injectable, signal } from '@angular/core';
import PocketBase, { RecordModel } from 'pocketbase';
import { environment } from '../../environment/environment.development';
import { User } from '../interfaces/userinterface';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
const pb = new PocketBase(environment.pocketbase.url);
@Injectable({
  providedIn: 'root',
})
export class PocketbaseAuthService {
  constructor() {}
  userRecord: any;
  employeeNameValue = new BehaviorSubject(this.employeeName);
  set employeeName(value: any) {
    this.employeeNameValue.next(value);
    localStorage.setItem('employeeName', value);
  }

  get employeeName() {
    return localStorage.getItem('employeeName');
  }

  login = async (username: string, password: string) => {
    try {
      const res = await pb
        .collection('users')
        .authWithPassword(username, password);
      this.storeName();
      return res;
    } catch (error: any) {
      throw error;
    }
  };
  storeName = async () => {
    try {
      const res = await pb
        .collection('employees')
        .getOne(this.model().employeeRecord, {
          fields: 'firstName,middleName,lastName',
        });
      this.employeeName = `${res['firstName']} ${res['lastName']}`;
    } catch (err) {
      console.log(err);
    }
  };
  logout = async () => {
    localStorage.clear();
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
