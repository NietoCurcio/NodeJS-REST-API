import { Request, Response } from 'express';
import { ImportCategoryService } from './ImportCategoryService';

class ImportCategoryController {
  constructor(private importCategoryService: ImportCategoryService) {}

  async handle(request: Request, response: Response) {
    const { file } = request;
    try {
      await this.importCategoryService.execute(file);
      response.status(201).json();
    } catch (err) {
      response.status(403).json({ error: err.message });
    }
  }
}

export { ImportCategoryController };
