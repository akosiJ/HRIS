import { Injectable, signal } from '@angular/core';
import PocketBase from 'pocketbase';
import { environment } from '../../environment/environment.development';
import {
  CreateEmployeeRecordResponse,
  CreateUserRecordParam,
} from '../interfaces/employee-record';
import {
  EmployeeRecord,
  UpdateEmployeeRecord,
} from '../interfaces/pbEmployeeInterface';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { User } from '../interfaces/userinterface';
const pb = new PocketBase(environment.pocketbase.url);

export interface TableActions extends PageEvent, Sort {}

@Injectable({
  providedIn: 'root',
})
export class PocketbaseEmployeesService {
  constructor() {}

  getEmployeesRecords = async (
    tableControl: TableActions,
    search?: string | null
  ) => {
    const columnSearch = [
      'firstName',
      'lastName',
      'emailAddress',
      'middleName',
      'mobileNumber',
      'employedDate',
    ];
    return await pb
      .collection('employees')
      .getList(tableControl.pageIndex, tableControl.pageSize, {
        sort: `${tableControl.direction == 'asc' ? '+' : '-'}${
          tableControl.active
        }`,
        filter: search
          ? columnSearch.map((column) => `${column} ~ '${search}'`).join('||')
          : '',
      });
  };

  generateIdNumber = async () => {
    let dateInitializer = this.getNewDate();
    const value = await pb
      .collection('employees')
      .getList(1, 1, {
        fields: 'employeeIdNumber',
        filter: `employeeIdNumber ?~ ${dateInitializer.slice(0, 4)}`,
      })
      .then((res) => {
        let counter;
        if (res.totalItems < 10000) {
          counter = (res.totalItems + 10000).toString().slice(-4);
        } else counter = res.totalItems;

        return dateInitializer + counter;
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
    return (await pb
      .collection('employees')
      .create(data)) as CreateEmployeeRecordResponse;
  };
  updateEmployeeRecord = async (id: string, data: any) => {
    try {
      const res = await pb.collection('employees').update(id, data.value);
      return res as UpdateEmployeeRecord;
    } catch (error) {
      throw error;
    }
  };

  createEmployeeLogin = async (data: CreateUserRecordParam) => {
    return await pb.collection('users').create(data);
  };

  getOneSelfRecord = async (id: string) => {
    try {
      const res = (await pb.collection('employees').getOne(id)) as User;
      return res;
    } catch (error) {
      throw error;
    }
  };
}
