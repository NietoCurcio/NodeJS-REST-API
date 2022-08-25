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

class InitDataSource {
  public hasMigrationsBeenRan: boolean = false;
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async init() {
    try {
      await this.dataSource.initialize();
      console.log('Data Source has been initialized!');

      await this.dataSource.runMigrations();
      this.hasMigrationsBeenRan = true;
      console.log('Migrations executed!');
    } catch (err) {
      console.error('Error during Data Source initialization');
      console.error(err);
    }
  }
}

export const initDataSource = new InitDataSource(PostgresDataSource);
// note, running migrations
// docker exec nodejs-rest-api npm run typeorm migration:run -- -d "./src/database/index.ts"

// creating a migration
// npm run typeorm migration:create "./src/database/migrations/CreateSpecifications"
