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
    return await pb
      .collection('employees')
      .getList(1, 1, {
        fields: 'employee_id_number',
        filter: `employee_id_number ?~ ${dateInitializer}`,
      })
      .then((res) => {
        return dateInitializer + (res.totalItems + 10000).toString().slice(-4);
      })
      .catch((error) => {
        return error.data;
      });
  };

  getNewDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-indexed in JS, so add 1

    return `${year}${String(month).padStart(2, '0')}`;
  }
}
