import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { environment } from '../environment/environment.development';
const pb = new PocketBase(environment.pocketbase.url);
@Injectable({
  providedIn: 'root',
})
export class PocketbaseTimelogService {
  constructor() {}
  createTimeLog = async (email: string | null) => {
    let dateToday = new Date();
    let data = {
      timeIn: dateToday,
      employeeEmailAddress: email,
    };
    // check if time-in already exist, getFirstItem always return value [?]
    return await pb
      .collection('time_logs')
      .getFirstListItem(
        `timeIn >= '${dateToday
          .toISOString()
          .slice(0, 10)}' && employeeEmailAddress = '${email}'`
      )
      .then(async (res) => {
        if (res) {
          // time-in already exist procees to time-out update record
          return await pb
            .collection('time_logs')
            .update(`${res.id}`, {
              timeOut: dateToday,
              employeeEmailAddress: email,
            })
            .then((res) => {
              // time out update record success
              return { ...res, success: 'timeOut' };
            })
            .catch((error) => {
              // update record failed
              throw error;
            });
        }
        return res;
      })
      .catch(async (error) => {
        console.log(error.response);
        if (error.data.code == 404) {
          // create new time log
          return await pb
            .collection('time_logs')
            .create(data)
            .then((res) => {
              return { ...res, success: 'timeIn' };
            })
            .catch((error) => {
              // email input did not exist
              throw error;
            });
        }
        return error;
      });
  };
}
