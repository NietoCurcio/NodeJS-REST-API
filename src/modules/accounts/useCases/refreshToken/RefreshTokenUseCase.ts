import auth from '@config/auth';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider') private dateProvider: IDateProvider
  ) {}

  async invalidateRefreshToken(userId: string, refresh_token: string) {
    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        userId,
        refresh_token
      );

    if (!userToken) throw new AppError('Refresh token does not exists', 401);

    await this.usersTokensRepository.deleteById(userToken.id);
  }

  async generateRefreshToken(userId: string, email: string): Promise<string> {
    const new_refresh_token = sign({ email }, auth.jwt_secret_refresh_token, {
      subject: userId,
      expiresIn: auth.refresh_token_expiration,
    });

    const expiration_date = this.dateProvider.addDays(
      auth.refresh_token_expiration_days
    );

    await this.usersTokensRepository.create({
      expiration_date,
      refresh_token: new_refresh_token,
      userId,
    });

    return new_refresh_token;
  }

  async generateToken(userId: string): Promise<string> {
    const new_token = sign({}, auth.jwt_secret_token, {
      subject: userId,
      expiresIn: auth.token_expiration,
    });

    return new_token;
  }

  async execute(refresh_token: string): Promise<ITokenResponse> {
    const { sub: userId, email } = verify(
      refresh_token,
      auth.jwt_secret_refresh_token
    ) as IPayload;

    await this.invalidateRefreshToken(userId, refresh_token);

    const new_refresh_token = await this.generateRefreshToken(userId, email);

    const new_token = await this.generateToken(userId);

    return {
      refresh_token: new_refresh_token,
      token: new_token,
    };
  }
}

export { RefreshTokenUseCase };
