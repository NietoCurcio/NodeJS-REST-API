import dayjs from 'dayjs';
import { CreateRentalUseCase } from './CreateRentalUseCase';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const add24hours = dayjs().add(1, 'day').toDate();

  beforeAll(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    await usersRepositoryInMemory.create({
      email: 'test@gmail.com',
      name: 'test',
      password: '123',
      driver_license: '1234',
    });
  });

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
    const car = await carsRepositoryInMemory.create({
      name: 'test',
      brand: 'brand',
      category: new Category(),
      daily_rate: 10,
      description: 'desc',
      fine_amount: 10,
      license_plate: '1234',
    });

    let user = await usersRepositoryInMemory.findByEmail('test@gmail.com');

    const rental = await createRentalUseCase.execute({
      userId: user.id,
      carId: car.id,
      expected_return_date: add24hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not create a rental for a user with an unclosed rental', async () => {
    const user = await usersRepositoryInMemory.findByEmail('test@gmail.com');

    const car = await carsRepositoryInMemory.create({
      name: 'test',
      brand: 'brand',
      category: new Category(),
      daily_rate: 10,
      description: 'desc',
      fine_amount: 10,
      license_plate: '1234',
    });

    const car2 = await carsRepositoryInMemory.create({
      name: 'test2',
      brand: 'brand',
      category: new Category(),
      daily_rate: 10,
      description: 'desc',
      fine_amount: 10,
      license_plate: '1234',
    });

    await createRentalUseCase.execute({
      userId: user.id,
      carId: car.id,
      expected_return_date: add24hours,
    });

    await expect(
      createRentalUseCase.execute({
        userId: user.id,
        carId: car2.id,
        expected_return_date: add24hours,
      })
    ).rejects.toEqual(new AppError("There's an unclosed rent for the user"));
  });

  it('should not create a rental for a car with an unclosed rental', async () => {
    const user = await usersRepositoryInMemory.findByEmail('test@gmail.com');

    await usersRepositoryInMemory.create({
      email: 'test2@gmail.com',
      name: 'test2',
      password: '123',
      driver_license: '1234',
    });

    const user2 = await usersRepositoryInMemory.findByEmail('test2@gmail.com');

    const car = await carsRepositoryInMemory.create({
      name: 'test',
      brand: 'brand',
      category: new Category(),
      daily_rate: 10,
      description: 'desc',
      fine_amount: 10,
      license_plate: '1234',
    });

    await createRentalUseCase.execute({
      userId: user.id,
      carId: car.id,
      expected_return_date: add24hours,
    });

    await expect(
      createRentalUseCase.execute({
        userId: user2.id,
        carId: car.id,
        expected_return_date: add24hours,
      })
    ).rejects.toEqual(new AppError('Car unavailable'));
  });

  it('should not create a rental with invalid return date', async () => {
    const user = await usersRepositoryInMemory.findByEmail('test@gmail.com');

    const car = await carsRepositoryInMemory.create({
      name: 'test',
      brand: 'brand',
      category: new Category(),
      daily_rate: 10,
      description: 'desc',
      fine_amount: 10,
      license_plate: '1234',
    });

    await expect(
      createRentalUseCase.execute({
        userId: user.id,
        carId: car.id,
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toMatchObject(new AppError('Invalid return date'));
  });
});
