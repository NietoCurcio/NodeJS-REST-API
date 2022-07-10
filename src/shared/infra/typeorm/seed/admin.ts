import { InitPostgresDataSource, PostgresDataSource } from '../index';
import { hash } from 'bcryptjs';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

async function create() {
  await InitPostgresDataSource();

  const userDataSource = PostgresDataSource.getRepository(User);

  const password = await hash('1234', 8);

  const data = {
    name: 'admin',
    email: 'admin@gmail.com',
    password,
    isAdmin: true,
    driver_license: '123456',
  };

  const user = userDataSource.create(data);
  await userDataSource.save(user);

  await PostgresDataSource.destroy();
}

create().then(() => console.log('Admin created'));
