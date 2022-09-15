import { Router } from 'express';
import multer from 'multer';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import { UploadConfig } from '@config/Upload';
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { AuthGuards } from '../middlewares/AuthGuards';
import { container } from 'tsyringe';
import { ProfileController } from '@modules/accounts/useCases/profile/ProfileController';

const usersRoutes = Router();

const uploadAvatar = multer(UploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileController = new ProfileController();

const authGuards = container.resolve(AuthGuards);

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch(
  '/avatar',
  authGuards.authenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
);

usersRoutes.get('/profile', authGuards.authenticated, profileController.handle);

export { usersRoutes };
