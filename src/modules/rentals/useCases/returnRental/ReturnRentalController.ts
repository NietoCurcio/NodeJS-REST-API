import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ReturnRentalUseCase } from './ReturnRentalUseCase';

class ReturnRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;
    const { rentalId } = request.params;

    const devolutionRentalUseCase = container.resolve(ReturnRentalUseCase);

    const rental = await devolutionRentalUseCase.execute({
      id: rentalId,
      userId,
    });

    return response.json(rental);
  }
}

export { ReturnRentalController };
