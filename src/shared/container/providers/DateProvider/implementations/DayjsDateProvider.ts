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

  compareInDays(start_date: Date, end_date: Date): number {
    const endDateLocalUTC = this.convertToLocalUTC(end_date);
    const startDateLocalUTC = this.convertToLocalUTC(start_date);

    return dayjs(endDateLocalUTC).diff(startDateLocalUTC, 'days');
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, 'hours').toDate();
  }

  isDateBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }
}

export { DayjsDateProvider };
