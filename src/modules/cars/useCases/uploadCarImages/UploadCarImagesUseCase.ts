import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';
import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  carId: string;
  image_names: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarImagesRepository')
    private carImagesRepository: ICarImagesRepository,
    @inject('CarsRepository') private carsRepository: ICarsRepository
  ) {}

  async execute({ carId, image_names }: IRequest): Promise<Car> {
    const car = await this.carsRepository.findAvailableById(carId);

    if (!car) throw new AppError('Car does not exists', 404);

    const carImages: CarImage[] = new Array<CarImage>();
    for (const image_name of image_names) {
      const carImage = await this.carImagesRepository.create(carId, image_name);
      carImages.push(carImage);
    }

    car.images = carImages;

    return car;
  }
}

export { UploadCarImagesUseCase };
