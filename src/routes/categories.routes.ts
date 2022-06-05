import { Router } from 'express';
import { CategoriesRepository } from '../repositories/CategoriesRepository';
import { CreateCategoryService } from '../services/CreateCategoryService';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (req, res) => {
  /*
  SRP - single responsibility principle

  the responsibility of the route is:
  receive request
  process (calls a service)
  return a response
  */
  const { name, description } = req.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);

  createCategoryService.execute({ name, description });

  return res.status(201).json();
});

categoriesRoutes.get('/', (req, res) => {
  const all = categoriesRepository.list();
  return res.json(all);
});

export { categoriesRoutes };
