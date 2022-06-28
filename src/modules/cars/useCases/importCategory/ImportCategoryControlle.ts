import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';
import { AppError } from '@shared/errors/AppError';

class ImportCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;
    try {
      const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

      await importCategoryUseCase.execute(file);
      return response.status(201).json();
    } catch (err) {
      throw new AppError('Error importing categories');
    }
  }
}

export { ImportCategoryController };
