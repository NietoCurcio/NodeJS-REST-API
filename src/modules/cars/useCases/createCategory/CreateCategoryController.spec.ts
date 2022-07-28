import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { hash } from 'bcryptjs';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { PostgresDataSource } from '@shared/infra/typeorm';

describe('Create Category Controller', () => {
  beforeAll(async () => {
    if (!PostgresDataSource.isInitialized)
      await PostgresDataSource.initialize();

    await PostgresDataSource.runMigrations();

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

  it('should create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@gmail.com',
      password: '1234',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category supertest',
        description: 'Category supertest description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  it('should not create a category already existing', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@gmail.com',
      password: '1234',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category supertest',
        description: 'Category supertest description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
  });

  afterAll(async () => {
    await PostgresDataSource.dropDatabase();
    await PostgresDataSource.destroy();
  });
});
