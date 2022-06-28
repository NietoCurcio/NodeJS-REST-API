import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { PostgresDataSource } from '@shared/infra/typeorm';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(User);
  }

  async create(data: ICreateUserDTO): Promise<void> {
    const user = this.repository.create(data);

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOneBy({ email });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOneBy({ id });
    return user;
  }
}

export { UsersRepository };
