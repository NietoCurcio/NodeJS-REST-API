import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';
import { Router } from 'express';
import { container } from 'tsyringe';
import { AuthGuards } from '../middlewares/AuthGuards';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

const authGuards = container.resolve(AuthGuards);

rentalsRoutes.post(
  '/',
  authGuards.authenticated,
  createRentalController.handle
);

rentalsRoutes.get(
  '/user',
  authGuards.authenticated,
  listRentalsByUserController.handle
);

export { rentalsRoutes };
