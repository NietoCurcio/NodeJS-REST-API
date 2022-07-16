import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';
import { PostgresDataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { CarImage } from '../entities/CarImage';

class CarImagesRepository implements ICarImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(CarImage);
  }

  async create(carId: string, image_name: string): Promise<CarImage> {
    const carImage = this.repository.create({ carId, image_name });

    await this.repository.save(carImage);

    return carImage;
  }
}

export { CarImagesRepository };
