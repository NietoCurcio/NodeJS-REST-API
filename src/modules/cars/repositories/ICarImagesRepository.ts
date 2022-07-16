import { CarImage } from '../infra/typeorm/entities/CarImage';

interface ICarImagesRepository {
  create(carId: string, image_name: string): Promise<CarImage>;
}

export { ICarImagesRepository };
