import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UserTokens } from '../infra/typeorm/entities/UserTokens';

interface IUsersTokensRepository {
  create({
    expiration_date,
    refresh_token,
    userId,
  }: ICreateUserTokenDTO): Promise<UserTokens>;
  findByUserIdAndRefreshToken(
    userId: string,
    refresh_token: string
  ): Promise<UserTokens>;

  deleteById(id: string): Promise<void>;
}

export { IUsersTokensRepository };
