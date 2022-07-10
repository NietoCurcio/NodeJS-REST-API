import { Router } from 'express';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { container } from 'tsyringe';
import { AuthGuards } from '../middlewares/AuthGuards';

const carsRoutes = Router();

const createCarController = new CreateCarController();

const authGuards = container.resolve(AuthGuards);

carsRoutes.post(
  '/',
  authGuards.authenticated,
  authGuards.administrator,
  createCarController.handle
);

export { carsRoutes };
