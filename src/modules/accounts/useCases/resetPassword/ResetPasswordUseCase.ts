import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider') private dateProvider: IDateProvider,
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}

  async execute({ token, password }: IRequest) {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token
    );

    if (!userToken) throw new AppError('Token invalid', 401);

    if (
      this.dateProvider.isDateBefore(
        userToken.expiration_date,
        this.dateProvider.dateNow()
      )
    )
      throw new AppError('Token expired', 401);

    const user = await this.usersRepository.findById(userToken.userId);

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUseCase };
