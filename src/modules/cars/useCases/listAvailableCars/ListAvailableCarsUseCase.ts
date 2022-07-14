import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  categoryId?: string;
  brand?: string;
  name?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository') private carsRepository: ICarsRepository
  ) {}

  async execute({ categoryId, brand, name }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable({
      categoryId,
      brand,
      name,
    });
    return cars;
  }
}

export { ListAvailableCarsUseCase };
