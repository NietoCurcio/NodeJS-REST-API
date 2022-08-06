import { CarImagesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarImagesRepositoryInMemory';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { UploadCarImagesUseCase } from './UploadCarImagesUseCase';

let uploadCarImagesUseCase: UploadCarImagesUseCase;
let carImagesRepositoryInMemory: CarImagesRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Upload Car Images', () => {
  beforeEach(async () => {
    carImagesRepositoryInMemory = new CarImagesRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    uploadCarImagesUseCase = new UploadCarImagesUseCase(
      carImagesRepositoryInMemory,
      carsRepositoryInMemory
    );
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    await categoriesRepositoryInMemory.create({
      name: 'Category test',
      description: 'Description category test',
    });
  });

  it("should create a car's images.", async () => {
    const categoryTest = await categoriesRepositoryInMemory.findByName(
      'Category test'
    );

    const newCar = await carsRepositoryInMemory.create({
      brand: 'Brand',
      daily_rate: 100,
      description: 'Description Car',
      fine_amount: 60,
      license_plate: 'ABC-1234',
      name: 'Name car',
      category: categoryTest,
    });

    const carId = newCar.id;
    const image_names = ['name1', 'name2'];

    const car = await uploadCarImagesUseCase.execute({ carId, image_names });

    expect(car).toHaveProperty('id');
    expect(car).toHaveProperty('images');
    expect(car).not.toMatchObject([]);
  });

  it("should not create a car's images for a non-existing car.", async () => {
    const carId = 'newCar.id1234';
    const image_names = ['name1', 'name2'];

    await expect(
      uploadCarImagesUseCase.execute({ carId, image_names })
    ).rejects.toEqual(new AppError('Car does not exists', 404));
  });
});
