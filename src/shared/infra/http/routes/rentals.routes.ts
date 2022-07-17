import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { Router } from 'express';
import { container } from 'tsyringe';
import { AuthGuards } from '../middlewares/AuthGuards';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();

const authGuards = container.resolve(AuthGuards);

rentalsRoutes.post(
  '/',
  authGuards.authenticated,
  createRentalController.handle
);

export { rentalsRoutes };
