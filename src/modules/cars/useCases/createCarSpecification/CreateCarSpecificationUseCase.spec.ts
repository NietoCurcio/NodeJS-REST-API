import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

let carsRepositoryInMemory: CarsRepositoryInMemory;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(async () => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );

    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    await categoriesRepositoryInMemory.create({
      name: 'Category test',
      description: 'Description category test',
    });
  });

  it('should not add a new specification to a non-existent car', async () => {
    const carId = '1234';
    const specificationsId = ['543'];
    await expect(
      createCarSpecificationUseCase.execute({ carId, specificationsId })
    ).rejects.toEqual(new AppError('Car does not exists', 404));
  });

  it('should add a new specification to a car', async () => {
    const categoryTest = await categoriesRepositoryInMemory.findByName(
      'Category test'
    );

    const car = await carsRepositoryInMemory.create({
      brand: 'Brand',
      daily_rate: 100,
      description: 'Description Car',
      fine_amount: 60,
      license_plate: 'ABC-1234',
      name: 'Name car',
      category: categoryTest,
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: 'Specification name',
      description: 'Specification description',
    });

    const carId = car.id;
    const specificationsId = [specification.id];
    const specificationsCar = await createCarSpecificationUseCase.execute({
      carId,
      specificationsId,
    });

    expect(specificationsCar).toHaveProperty('specifications');
    expect(specificationsCar.specifications.length).toBe(1);
  });
});
