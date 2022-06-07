import { Request, Response } from 'express';
import { ImportCategoryService } from './ImportCategoryService';

class ImportCategoryController {
  constructor(private importCategoryService: ImportCategoryService) {}

  handle(request: Request, response: Response) {
    const { file } = request;
    this.importCategoryService.execute(file);
    return response.send();
  }
}

export { ImportCategoryController };
