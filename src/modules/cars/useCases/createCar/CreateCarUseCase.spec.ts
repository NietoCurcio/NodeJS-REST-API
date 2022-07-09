import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should create a new car', async () => {
    const car = await createCarUseCase.execute({
      brand: 'Brand',
      category_id: 'category',
      daily_rate: 100,
      description: 'Description Car',
      fine_amount: 60,
      license_plate: 'ABC-1234',
      name: 'Name car',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not create a car with a license plate already existing', () => {
    expect(async () => {
      await createCarUseCase.execute({
        brand: 'Brand',
        category_id: 'category',
        daily_rate: 100,
        description: 'Description Car',
        fine_amount: 60,
        license_plate: 'ABC-1234',
        name: 'Name car',
      });

      await createCarUseCase.execute({
        brand: 'Brand',
        category_id: 'category',
        daily_rate: 100,
        description: 'Description Car',
        fine_amount: 60,
        license_plate: 'ABC-1234',
        name: 'Name car2',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      brand: 'Brand',
      category_id: 'category',
      daily_rate: 100,
      description: 'Description Car',
      fine_amount: 60,
      license_plate: 'ACC-1234',
      name: 'Name available',
    });

    expect(car.available).toBe(true);
  });
});
