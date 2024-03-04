import { RecordModel } from 'pocketbase';

export interface EmployeeRecord {
  employeeIdNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  mobileNumber: number;
  emailAddress: string;
  employedDate: string;
  isActive: boolean;
  salaryRate: number;
  usersID: string;
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  updated: string;
}

export interface UpdateEmployeeRecord extends EmployeeRecord, RecordModel {}
