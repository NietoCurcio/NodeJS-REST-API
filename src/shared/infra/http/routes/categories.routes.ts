import { Router } from 'express';
import multer from 'multer';
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryControlle';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { container } from 'tsyringe';
import { AuthGuards } from '../middlewares/AuthGuards';

const categoriesRoutes = Router();

const upload = multer({ dest: './tmp' });

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

const authGuards = container.resolve(AuthGuards);

categoriesRoutes.post(
  '/',
  authGuards.authenticated,
  authGuards.administrator,
  createCategoryController.handle
);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post(
  '/import',
  authGuards.authenticated,
  authGuards.administrator,
  upload.single('file'),
  importCategoryController.handle
);

export { categoriesRoutes };
