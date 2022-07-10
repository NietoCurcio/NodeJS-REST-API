import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { ListCarsUseCase } from './ListCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let listCarsUseCase: ListCarsUseCase;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it('should list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Audi A1',
      description: 'Carro com espaço',
      daily_rate: 110,
      license_plate: 'DEF-3838',
      fine_amount: 38,
      brand: 'Audi',
      category: {
        id: 'cat.id',
        name: 'cat.name',
        created_at: new Date(),
        description: 'cat.description',
      },
    });

    const cars = await listCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });

  it('should list all available cars by brand', async () => {
    await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Carro com espaço1',
      daily_rate: 110,
      license_plate: 'DEF-3838',
      fine_amount: 38,
      brand: 'Car_brand',
      category: {
        id: 'cat.id',
        name: 'cat.name',
        created_at: new Date(),
        description: 'cat.description',
      },
    });

    const car2 = await carsRepositoryInMemory.create({
      name: 'Car2',
      description: 'Carro com espaço2',
      daily_rate: 110,
      license_plate: 'DEF-3839',
      fine_amount: 38,
      brand: 'Car_brand2',
      category: {
        id: 'cat.id',
        name: 'cat.name',
        created_at: new Date(),
        description: 'cat.description',
      },
    });

    const cars = await listCarsUseCase.execute({ brand: 'Car_brand2' });

    expect(cars).toEqual([car2]);
  });

  it('should list all available cars by name', async () => {
    await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Carro com espaço1',
      daily_rate: 110,
      license_plate: 'DEF-3838',
      fine_amount: 38,
      brand: 'Car_brand',
      category: {
        id: 'cat.id',
        name: 'cat.name',
        created_at: new Date(),
        description: 'cat.description',
      },
    });

    const car2 = await carsRepositoryInMemory.create({
      name: 'Car2',
      description: 'Carro com espaço2',
      daily_rate: 110,
      license_plate: 'DEF-3839',
      fine_amount: 38,
      brand: 'Car_brand2',
      category: {
        id: 'cat.id',
        name: 'cat.name',
        created_at: new Date(),
        description: 'cat.description',
      },
    });

    const cars = await listCarsUseCase.execute({ name: 'Car2' });

    expect(cars).toEqual([car2]);
  });

  it('should list all available cars by categoryId', async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Carro com espaço1',
      daily_rate: 110,
      license_plate: 'DEF-3839',
      fine_amount: 38,
      brand: 'Car_brand',
      category: {
        id: '123456',
        name: 'cat.name',
        created_at: new Date(),
        description: 'cat.description',
      },
    });

    const car2 = await carsRepositoryInMemory.create({
      name: 'Car2',
      description: 'Carro com espaço2',
      daily_rate: 110,
      license_plate: 'DEF-3840',
      fine_amount: 38,
      brand: 'Car_brand2',
      category: {
        id: '123456',
        name: 'cat.name',
        created_at: new Date(),
        description: 'cat.description',
      },
    });

    await carsRepositoryInMemory.create({
      name: 'Car3',
      description: 'Carro com espaço2',
      daily_rate: 110,
      license_plate: 'DEF-3841',
      fine_amount: 38,
      brand: 'Car_brand2',
      category: {
        id: '1234567',
        name: 'cat.name',
        created_at: new Date(),
        description: 'cat.description',
      },
    });

    const cars = await listCarsUseCase.execute({ categoryId: '123456' });

    expect(cars).toEqual([car1, car2]);
  });
});
