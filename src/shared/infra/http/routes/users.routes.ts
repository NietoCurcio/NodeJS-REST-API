import { Router } from 'express';
import multer from 'multer';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import { UploadConfig } from '@config/Upload';
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { AuthGuards } from '../middlewares/AuthGuards';
import { container } from 'tsyringe';

const usersRoutes = Router();

const uploadAvatar = multer(UploadConfig.upload('./tmp/avatar'));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const authGuards = container.resolve(AuthGuards);

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch(
  '/avatar',
  authGuards.authenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
);

export { usersRoutes };
