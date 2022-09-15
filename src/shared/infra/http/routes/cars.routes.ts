import { Router } from 'express';
import multer from 'multer';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { container } from 'tsyringe';
import { AuthGuards } from '../middlewares/AuthGuards';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController';
import { UploadConfig } from '@config/Upload';

const carsRoutes = Router();

const uploadCarImages = multer(UploadConfig);

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

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

carsRoutes.post(
  '/images/:carId',
  authGuards.authenticated,
  authGuards.administrator,
  uploadCarImages.array('images'),
  uploadCarImagesController.handle
);

export { carsRoutes };
