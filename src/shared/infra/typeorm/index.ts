import { DataSource } from 'typeorm';

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: 'postgresql-database', // container name
  port: 5432,
  username: 'myusername',
  password: 'mypassword',
  database: 'rentx',
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
});

// note, running migrations
// docker exec nodejs-rest-api npm run typeorm migration:run -- -d "./src/database/index.ts"

// creating a migration
// npm run typeorm migration:create "./src/database/migrations/CreateSpecifications"

PostgresDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
