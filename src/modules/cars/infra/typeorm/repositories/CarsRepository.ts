import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { PostgresDataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(Car);
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create(data);

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOneBy({ license_plate });
    return car;
  }

  async findAvailable({ brand, categoryId, name }): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('c')
      .innerJoinAndSelect('c.category', 'category')
      .leftJoinAndSelect('c.specifications', 'specifications')
      .leftJoinAndSelect('c.images', 'images')
      .where('available = :available', { available: true });

    if (brand) {
      carsQuery.andWhere('c.brand = :brand', { brand });
    }

    if (name) {
      carsQuery.andWhere('c.name = :name', { name });
    }

    if (categoryId) {
      carsQuery.andWhere('c.category.id = :categoryId', { categoryId });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findAvailableById(id: string): Promise<Car> {
    const carQuery = this.repository
      .createQueryBuilder('car')
      .innerJoinAndSelect('car.category', 'category')
      .leftJoinAndSelect('car.specifications', 'specifications')
      .leftJoinAndSelect('car.images', 'images')
      .where('car.id = :id', { id })
      .andWhere('car.available = :available', { available: true });

    const car = await carQuery.getOne();

    return car;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOneBy({ id });
    return car;
  }

  async updateAvailableById(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where('id = :id', { id })
      .execute();
  }
}

export { CarsRepository };
