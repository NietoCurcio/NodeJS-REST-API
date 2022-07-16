import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCarImages1657933482297 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'car_images',
        columns: [
          {
            name: 'carId',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'image_name',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKCarImages',
            columnNames: ['carId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'cars',
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('car_images');
  }
}
