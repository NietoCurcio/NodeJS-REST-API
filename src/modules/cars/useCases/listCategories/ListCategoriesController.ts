import { Request, Response } from 'express';
import { container, inject, injectable } from 'tsyringe';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoriesService = container.resolve(ListCategoriesUseCase);

    const categories = await listCategoriesService.execute();

    return response.json(categories);
  }
}

export { ListCategoriesController };
