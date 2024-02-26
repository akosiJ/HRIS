import { Injectable } from '@angular/core';
import PocketBase, { RecordModel } from 'pocketbase';
import { environment } from '../environment/environment.development';
import { BehaviorSubject } from 'rxjs';
const pb = new PocketBase(environment.pocketbase.url);
@Injectable({
  providedIn: 'root',
})
export class PocketbaseEmployeesService {
  constructor() {}
  getEmployeesRecords = async (page: number, size: number, filter: string) => {
    return await pb.collection('employees').getList(page, size, {
      filter: ``,
    });
  };

  generateIdNumber = async () => {
    let dateInitializer = this.getNewDate();
    const value = await pb
      .collection('employees')
      .getList(1, 1, {
        fields: 'employeeIdNumber',
        filter: `employeeIdNumber ?~ ${dateInitializer}`,
      })
      .then((res) => {
        return dateInitializer + (res.totalItems + 10000).toString().slice(-4);
      })
      .catch((error) => {
        return error.data;
      });
    return value;
  };

  getNewDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    return `${year}${String(month).padStart(2, '0')}`;
  }

  createEmployeeRecord = async (data: any) => {
    return await pb.collection('employees').create(data);
  };
}
