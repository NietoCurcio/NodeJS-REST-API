import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { CreateCategoryController } from './CreateCategoryController';
import { CreateCategoryService } from './CreateCategoryService';

/*
Dependency Injection (DI)

From Angular: 
Dependencies are services or objects that a class needs to perform its function.
Dependency injection, or DI, is a design pattern in which a class requests dependencies
from external sources rather than creating them.

From NestJS:
Dependency injection is an inversion of control (IoC) technique wherein you delegate
instantiation of dependencies to the IoC container.
*/

const categoriesRepository = new CategoriesRepository();

const createCategoryService = new CreateCategoryService(categoriesRepository);

const createCategoryController = new CreateCategoryController(
  createCategoryService
);

export { createCategoryController };
