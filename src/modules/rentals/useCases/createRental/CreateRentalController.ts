import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateRentalUseCase } from './CreateRentalUseCase';

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { carId, expected_return_date } = request.body;
    const { id: userId } = request.user;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      carId,
      expected_return_date,
      userId,
    });

    return response.status(201).json(rental);
  }
}

export { CreateRentalController };
