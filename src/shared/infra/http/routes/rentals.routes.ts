import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';
import { ReturnRentalController } from '@modules/rentals/useCases/returnRental/ReturnRentalController';
import { Router } from 'express';
import { container } from 'tsyringe';
import { AuthGuards } from '../middlewares/AuthGuards';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const listRentalsByUserController = new ListRentalsByUserController();
const returnRentalController = new ReturnRentalController();

const authGuards = container.resolve(AuthGuards);

rentalsRoutes.post(
  '/',
  authGuards.authenticated,
  createRentalController.handle
);

rentalsRoutes.post(
  '/return/:rentalId',
  authGuards.authenticated,
  returnRentalController.handle
);

rentalsRoutes.get(
  '/user',
  authGuards.authenticated,
  listRentalsByUserController.handle
);

export { rentalsRoutes };
