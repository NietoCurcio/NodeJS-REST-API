import { Router } from 'express';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { container } from 'tsyringe';
import { AuthGuards } from '../middlewares/AuthGuards';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

const authGuards = container.resolve(AuthGuards);

carsRoutes.post(
  '/',
  authGuards.authenticated,
  authGuards.administrator,
  createCarController.handle
);

carsRoutes.get('/available', listAvailableCarsController.handle);

export { carsRoutes };
