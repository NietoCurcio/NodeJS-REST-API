import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;
    try {
      const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

      await importCategoryUseCase.execute(file);
      return response.status(201).json();
    } catch (err) {
      return response.status(403).json({ error: err.message });
    }
  }
}

export { ImportCategoryController };
