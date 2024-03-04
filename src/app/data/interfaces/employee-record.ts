export interface ViewEmployeeRecord {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  items: [
    {
      id: string;
      collectionId: string;
      collectionName: string;
      created: string;
      updated: string;
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
      facePicture: Array<any>;
    }
  ];
}

export interface CreateEmployeeRecordResponse {
  collectionId: 'p7xfxgk7sakb4z1';
  collectionName: 'employees';
  created: '2024-02-26 17:22:37.886Z';
  dateOfBirth: '2001-01-01 16:00:00.000Z';
  emailAddress: 'OneTwo@gmail.com';
  employedDate: '2024-02-26 17:22:07.014Z';
  employeeIdNumber: '2024020012';
  facePicture: [];
  firstName: 'One two';
  id: 'fza1ta60ma9kl0j';
  isActive: true;
  lastName: 'two';
  middleName: 'one';
  mobileNumber: 9176659112;
  salaryRate: 20000;
  updated: '2024-02-26 17:22:37.886Z';
  usersID: '';
}

export interface CreateUserRecordParam {
  username: string;
  email: string;
  emailVisibility: boolean;
  password: string;
  passwordConfirm: string;
  name: string;
  role: string;
  employeeRecord: string;
}
