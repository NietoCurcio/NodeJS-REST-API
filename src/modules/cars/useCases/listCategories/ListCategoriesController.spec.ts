import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { hash } from 'bcryptjs';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { initDataSource, PostgresDataSource } from '@shared/infra/typeorm';
import { waitFor } from '@utils/async';

describe('List Categories Controller', () => {
  beforeAll(async () => {
    await waitFor(() => initDataSource.hasMigrationsBeenRan === true);

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
  });

  it('should list all categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@gmail.com',
      password: '1234',
    });

    const { token } = responseToken.body;

    await request(app)
      .post('/categories')
      .send({
        name: 'Category supertest',
        description: 'Category supertest description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app).get('/categories');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0].name).toEqual('Category supertest');
  });

  afterAll(async () => {
    await PostgresDataSource.dropDatabase();
    await PostgresDataSource.destroy();
  });
});
