import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRentals1658006525737 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rentals',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'carId', type: 'uuid' },
          { name: 'userId', type: 'uuid' },
          { name: 'start_date', type: 'timestamp', default: 'now()' },
          { name: 'end_date', type: 'timestamp', isNullable: true },
          { name: 'expected_return_date', type: 'timestamp' },
          { name: 'total', type: 'numeric', isNullable: true },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
        foreignKeys: [
          {
            name: 'FKCarRental',
            columnNames: ['carId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'cars',
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKUserRental',
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rentals');
  }
}
