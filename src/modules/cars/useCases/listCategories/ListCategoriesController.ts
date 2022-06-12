import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { ListCategoriesService } from './ListCategoriesService';

@injectable()
class ListCategoriesController {
  constructor(
    @inject('ListCategoriesService')
    private listCategoriesService: ListCategoriesService
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const categories = await this.listCategoriesService.execute();

    return response.json(categories);
  }
}

export { ListCategoriesController };
