import { Router } from 'express';
import { AuthGuards } from '../middlewares/AuthGuards';
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ListSpecificationController } from '@modules/cars/useCases/listSpecification/ListSpecificationController';
import { container } from 'tsyringe';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

const authGuards = container.resolve(AuthGuards);

specificationsRoutes.post(
  '/',
  authGuards.authenticated,
  authGuards.administrator,
  createSpecificationController.handle
);

specificationsRoutes.get('/', listSpecificationController.handle);

export { specificationsRoutes };
