import { Request, Response } from 'express';
import { ListCategoriesService } from './ListCategoriesService';
import { PostgresDataSource } from '../../../../database';

class ListCategoriesController {
  constructor(private listCategoriesService: ListCategoriesService) {}

  handle(request: Request, response: Response): Response {
    const teste = PostgresDataSource;
    const categories = this.listCategoriesService.execute();

    return response.json(categories);
  }
}

export { ListCategoriesController };
