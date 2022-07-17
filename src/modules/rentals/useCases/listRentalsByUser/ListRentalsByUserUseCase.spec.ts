import dayjs from 'dayjs';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { ListRentalsByUserUseCase } from './ListRentalsByUserUseCase';

let listRentalsByUserUseCase: ListRentalsByUserUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe('List Rentals by User', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    listRentalsByUserUseCase = new ListRentalsByUserUseCase(
      rentalsRepositoryInMemory
    );
  });

  it('should list all rentals by a user', async () => {
    const add24hours = dayjs().add(1, 'day').toDate();

    const rental = await rentalsRepositoryInMemory.create({
      carId: '123',
      userId: '8',
      expected_return_date: add24hours,
    });

    const rentalsByUser = await listRentalsByUserUseCase.execute(rental.userId);

    expect(rentalsByUser).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ carId: '123', userId: '8' }),
      ])
    );
  });
});
