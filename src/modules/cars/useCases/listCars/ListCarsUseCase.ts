import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
  categoryId?: string;
  brand?: string;
  name?: string;
}

class ListCarsUseCase {
  constructor(private carsRepository: ICarsRepository) {}

  async execute({ categoryId, brand, name }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable({
      categoryId,
      brand,
      name,
    });
    return cars;
  }
}

export { ListCarsUseCase };
