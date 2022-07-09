import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  categoryId: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository') private carsRepository: ICarsRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({
    brand,
    categoryId,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      license_plate
    );

    if (carAlreadyExists) throw new AppError('Car already exists');

    const category = await this.categoriesRepository.findById(categoryId);

    return await this.carsRepository.create({
      brand,
      category,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });
  }
}

export { CreateCarUseCase };
