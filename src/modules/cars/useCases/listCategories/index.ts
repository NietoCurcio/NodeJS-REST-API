import { CategoriesRepository } from '../../repositories/CategoriesRepository';
import { ListCategoriesController } from './ListCategoriesController';
import { ListCategoriesService } from './ListCategoriesService';

// Dependency Injection

const categoriesRepository = CategoriesRepository.getInstance();
const listCategoriesService = new ListCategoriesService(categoriesRepository);

export const listCategoriesController = new ListCategoriesController(
  listCategoriesService
);
