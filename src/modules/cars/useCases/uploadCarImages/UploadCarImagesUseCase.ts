import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';
import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  carId: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarImagesRepository')
    private carImagesRepository: ICarImagesRepository,
    @inject('CarsRepository') private carsRepository: ICarsRepository,
    @inject('StorageProvider') private storageProvider: IStorageProvider
  ) {}

  async execute({ carId, images_name }: IRequest): Promise<Car> {
    const car = await this.carsRepository.findById(carId);

    if (!car) throw new AppError('Car does not exists', 404);

    const carImages: CarImage[] = new Array<CarImage>();
    for (const image_name of images_name) {
      const carImage = await this.carImagesRepository.create(carId, image_name);
      await this.storageProvider.save(image_name, 'cars');
      carImages.push(carImage);
    }

    car.images = carImages;

    return car;
  }
}

export { UploadCarImagesUseCase };
