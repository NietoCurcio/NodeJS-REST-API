interface ICreateRentalDTO {
  userId: string;
  carId: string;
  expected_return_date: Date;
}

export { ICreateRentalDTO };
