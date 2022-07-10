import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarUseCase } from './CreateCarUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe('Create car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(
      carsRepositoryInMemory,
      categoriesRepositoryInMemory
    );
  });

  it('should create a new car', async () => {
    const car = await createCarUseCase.execute({
      brand: 'Brand',
      daily_rate: 100,
      description: 'Description Car',
      fine_amount: 60,
      license_plate: 'ABC-1234',
      name: 'Name car',
      categoryId: 'category.id',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not create a car with a license plate already existing', () => {
    expect(async () => {
      await createCarUseCase.execute({
        brand: 'Brand',
        categoryId: 'category.id',
        daily_rate: 100,
        description: 'Description Car',
        fine_amount: 60,
        license_plate: 'ABC-1234',
        name: 'Name car',
      });

      await createCarUseCase.execute({
        brand: 'Brand',
        categoryId: 'category.id',
        daily_rate: 100,
        description: 'Description Car',
        fine_amount: 60,
        license_plate: 'ABC-1234',
        name: 'Name car2',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should create a car with available true by default', async () => {
    await categoriesRepositoryInMemory.create({
      name: 'Category test',
      description: 'Description category test',
    });
    const category = await categoriesRepositoryInMemory.findByName(
      'Category test'
    );

    const car = await createCarUseCase.execute({
      brand: 'Brand',
      categoryId: category.id,
      daily_rate: 100,
      description: 'Description Car',
      fine_amount: 60,
      license_plate: 'ACC-1234',
      name: 'Name available',
    });

    expect(car.available).toBe(true);
  });
});
