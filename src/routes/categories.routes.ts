import { Router } from 'express';
import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';

const categoriesRoutes = Router();

/*
  SRP - single responsibility principle

  the responsibility of the route is:
  receive request
  process (calls a service)
  return a response
*/

categoriesRoutes.post('/', (req, res) => {
  return createCategoryController.handle(req, res);
});

categoriesRoutes.get('/', (req, res) => {
  return listCategoriesController.handle(req, res);
});

export { categoriesRoutes };
