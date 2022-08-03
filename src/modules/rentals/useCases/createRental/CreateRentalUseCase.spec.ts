import dayjs from 'dayjs';
import { CreateRentalUseCase } from './CreateRentalUseCase';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const add24hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it('should create a rental', async () => {
    const rental = await createRentalUseCase.execute({
      userId: '1234',
      carId: '1212',
      expected_return_date: add24hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not create a rental for a user with an unclosed rental', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        userId: '1234',
        carId: '1212',
        expected_return_date: add24hours,
      });

      await createRentalUseCase.execute({
        userId: '1234',
        carId: '1213',
        expected_return_date: add24hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not create a rental for a car with an unclosed rental', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        userId: '1234',
        carId: '1212',
        expected_return_date: add24hours,
      });

      await createRentalUseCase.execute({
        userId: '1235',
        carId: '1212',
        expected_return_date: add24hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not create a rental with invalid return date', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        userId: '1234',
        carId: '1212',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toMatchObject({
      message: 'Invalid return date',
      statusCode: 400,
    });
  });
});
