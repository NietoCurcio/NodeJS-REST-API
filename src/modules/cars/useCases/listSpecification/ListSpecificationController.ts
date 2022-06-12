import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

export class ListSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listSpecificationUseCase = container.resolve(
      ListSpecificationsUseCase
    );

    const data = await listSpecificationUseCase.execute();

    return response.json(data);
  }
}
