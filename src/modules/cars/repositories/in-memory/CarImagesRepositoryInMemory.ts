import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';
import { ICarImagesRepository } from '../ICarImagesRepository';

class CarImagesRepositoryInMemory implements ICarImagesRepository {
  carImages: CarImage[] = [];

  async create(carId: string, image_name: string): Promise<CarImage> {
    const carImage = new CarImage();

    Object.assign(carImage, { carId, image_name });

    this.carImages.push(carImage);

    return carImage;
  }
}

export { CarImagesRepositoryInMemory };
