import { Request, Response } from 'express';
import { ListSpecificationsService } from './ListSpecificationsService';

export class ListSpecificationController {
  constructor(private listSpecificationService: ListSpecificationsService) {}

  handle(request: Request, response: Response): Response {
    const data = this.listSpecificationService.execute();

    return response.json(data);
  }
}
