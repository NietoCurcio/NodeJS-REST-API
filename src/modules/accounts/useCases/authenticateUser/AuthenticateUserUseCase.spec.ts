import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should authenticate a user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000132',
      email: 'user@test.com',
      name: 'name user',
      password: '1234',
      avatar: 'avatar',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not authenticate a non-existent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'user.email',
        password: 'user.password',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });

  it('should not authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000132',
      email: 'user@test.com',
      name: 'name user',
      password: '1234',
      avatar: 'avatar',
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'wrong password',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });
});
