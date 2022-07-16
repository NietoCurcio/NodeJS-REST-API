import { Router } from 'express';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { container } from 'tsyringe';
import { AuthGuards } from '../middlewares/AuthGuards';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
// const createCarSpecificationController = new CreateCarSpecificationController();
const createCarSpecificationController = container.resolve(
  CreateCarSpecificationController
);

const authGuards = container.resolve(AuthGuards);

carsRoutes.post(
  '/',
  authGuards.authenticated,
  authGuards.administrator,
  createCarController.handle
);

carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.post(
  '/specifications/:carId',
  authGuards.authenticated,
  authGuards.administrator,
  createCarSpecificationController.handle
);

export { carsRoutes };
