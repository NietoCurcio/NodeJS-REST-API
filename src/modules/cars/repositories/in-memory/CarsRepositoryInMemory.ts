import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, data);

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable({ categoryId, brand, name }): Promise<Car[]> {
    return this.cars.filter((car) => {
      if (!car.available) return false;

      if (brand) return car.brand === brand ? true : false;

      if (categoryId) return car.category.id === categoryId ? true : false;

      if (name) return car.name === name ? true : false;

      return true;
    });
  }
}

export { CarsRepositoryInMemory };
