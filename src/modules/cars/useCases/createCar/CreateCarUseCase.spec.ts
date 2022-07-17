import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarUseCase } from './CreateCarUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe('Create car', () => {
  beforeEach(async () => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(
      carsRepositoryInMemory,
      categoriesRepositoryInMemory
    );

    await categoriesRepositoryInMemory.create({
      name: 'Category test',
      description: 'Description category test',
    });
  });

  it('should create a new car', async () => {
    const categoryTest = await categoriesRepositoryInMemory.findByName(
      'Category test'
    );

    const car = await createCarUseCase.execute({
      brand: 'Brand',
      daily_rate: 100,
      description: 'Description Car',
      fine_amount: 60,
      license_plate: 'ABC-1234',
      name: 'Name car',
      categoryId: categoryTest.id,
    });

    expect(car).toHaveProperty('id');
  });

  it('should not create a new car with non-existing category', async () => {
    expect(async () => {
      const car = await createCarUseCase.execute({
        brand: 'Brand',
        daily_rate: 100,
        description: 'Description Car',
        fine_amount: 60,
        license_plate: 'ABC-1234',
        name: 'Name car',
        categoryId: 'category.id',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not create a car with a license plate already existing', () => {
    expect(async () => {
      const categoryTest = await categoriesRepositoryInMemory.findByName(
        'Category test'
      );

      await createCarUseCase.execute({
        brand: 'Brand',
        daily_rate: 100,
        description: 'Description Car',
        fine_amount: 60,
        license_plate: 'ABC-1234',
        name: 'Name car',
        categoryId: categoryTest.id,
      });

      await createCarUseCase.execute({
        brand: 'Brand',
        daily_rate: 100,
        description: 'Description Car',
        fine_amount: 60,
        license_plate: 'ABC-1234',
        name: 'Name car2',
        categoryId: categoryTest.id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should create a car with available true by default', async () => {
    const categoryTest = await categoriesRepositoryInMemory.findByName(
      'Category test'
    );

    const car = await createCarUseCase.execute({
      brand: 'Brand',
      categoryId: categoryTest.id,
      daily_rate: 100,
      description: 'Description Car',
      fine_amount: 60,
      license_plate: 'ACC-1234',
      name: 'Name available',
    });

    expect(car.available).toBe(true);
  });
});
