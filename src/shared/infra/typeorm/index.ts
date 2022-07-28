import { DataSource } from 'typeorm';

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: process.env.NODE_ENV === 'test' ? 'localhost' : 'postgresql-database',
  port: 5432,
  username: 'myusername',
  password: 'mypassword',
  database: process.env.NODE_ENV === 'test' ? 'rentx_test' : 'rentx',
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
});

export async function InitPostgresDataSource() {
  try {
    await PostgresDataSource.initialize();
    console.log('Data Source has been initialized!');
  } catch (err) {
    console.error('Error during Data Source initialization', err);
  }
}

// note, running migrations
// docker exec nodejs-rest-api npm run typeorm migration:run -- -d "./src/database/index.ts"

// creating a migration
// npm run typeorm migration:create "./src/database/migrations/CreateSpecifications"
