import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { AppError } from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

interface IRequest {
  carId: string;
  specificationsId: string[];
}

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { carId } = request.params;
    const { specificationsId } = request.body;

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );

    const car = await createCarSpecificationUseCase.execute({
      carId,
      specificationsId,
    });

    return response.json(car);
  }
}

export { CreateCarSpecificationController };
