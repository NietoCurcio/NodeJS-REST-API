import { Request, Response } from 'express';
import { ListCategoriesService } from './ListCategoriesService';
import { PostgresDataSource } from '../../../../database';

class ListCategoriesController {
  constructor(private listCategoriesService: ListCategoriesService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const categories = await this.listCategoriesService.execute();

    return response.json(categories);
  }
}

export { ListCategoriesController };
