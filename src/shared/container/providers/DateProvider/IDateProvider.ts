interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  convertToLocalUTC(date: Date): string;
  dateNow(): Date;
  compareInDays(start_date: Date, end_date: Date): number;
}

export { IDateProvider };
