import { Request, Response } from 'express';
import { container, inject, injectable } from 'tsyringe';
import { CreateCategoryService } from './CreateCategoryService';

@injectable()
class CreateCategoryController {
  constructor(
    @inject('CreateCategoryService')
    private createCategoryService: CreateCategoryService
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    try {
      // const createCategoryService = container.resolve(CreateCategoryService);

      await this.createCategoryService.execute({ name, description });
      return response.status(201).send();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { CreateCategoryController };
