import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    const endDateLocalUTC = this.convertToLocalUTC(end_date);
    const startDateLocalUTC = this.convertToLocalUTC(start_date);

    return dayjs(endDateLocalUTC).diff(startDateLocalUTC, 'hours');
  }
  convertToLocalUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }
  dateNow(): Date {
    return dayjs().toDate();
  }
}

export { DayjsDateProvider };
