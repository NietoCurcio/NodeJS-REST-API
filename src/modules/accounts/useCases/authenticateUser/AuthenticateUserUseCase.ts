import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import auth from '@config/auth';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider') private dateProvider: IDateProvider
  ) {}

  async generateToken(userId: string): Promise<string> {
    const token = sign({}, auth.jwt_secret_token, {
      subject: userId,
      expiresIn: auth.token_expiration,
    });

    return token;
  }

  async generateRefreshToken(userId: string, email: string): Promise<string> {
    const refresh_token = sign({ email }, auth.jwt_secret_refresh_token, {
      subject: userId,
      expiresIn: auth.refresh_token_expiration,
    });

    const refresh_token_expiration_date = this.dateProvider.addDays(
      auth.refresh_token_expiration_days
    );

    await this.usersTokensRepository.create({
      expiration_date: refresh_token_expiration_date,
      refresh_token,
      userId: userId,
    });

    return refresh_token;
  }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('Email or password incorrect');

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new AppError('Email or password incorrect');

    const token = await this.generateToken(user.id);

    const refresh_token = await this.generateRefreshToken(user.id, email);

    return {
      user: {
        name: user.name,
        email,
      },
      token,
      refresh_token,
    };
  }
}

export { AuthenticateUserUseCase };
