import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { PostgresDataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { UserTokens } from '../entities/UserTokens';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(UserTokens);
  }

  async create({
    expiration_date,
    refresh_token,
    userId,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      expiration_date,
      refresh_token,
      userId,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const userTokens = await this.repository.findOne({
      where: {
        userId,
        refresh_token,
      },
    });
    return userTokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UsersTokensRepository };
