import { container } from 'tsyringe';
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';
import { CreateCategoryController } from '../../modules/cars/useCases/createCategory/CreateCategoryController';
import { CreateCategoryService } from '../../modules/cars/useCases/createCategory/CreateCategoryService';
import { ListCategoriesController } from '../../modules/cars/useCases/listCategories/ListCategoriesController';
import { ListCategoriesService } from '../../modules/cars/useCases/listCategories/ListCategoriesService';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.register<CreateCategoryService>(
  'CreateCategoryService',
  CreateCategoryService
);

container.register<ListCategoriesService>(
  'ListCategoriesService',
  ListCategoriesService
);

const createCategoryController = container.resolve(CreateCategoryController);
const listCategoriesController = container.resolve(ListCategoriesController);

export { createCategoryController, listCategoriesController };
