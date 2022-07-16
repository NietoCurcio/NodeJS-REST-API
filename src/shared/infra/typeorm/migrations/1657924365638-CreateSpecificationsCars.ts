import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateSpecificationsCars1657924365638
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'specifications_cars',
        columns: [
          {
            name: 'carId',
            type: 'uuid',
          },
          {
            name: 'specificationId',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'specifications_cars',
      new TableForeignKey({
        name: 'FKSpecificationCar',
        columnNames: ['specificationId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'specifications',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      })
    );

    await queryRunner.createForeignKey(
      'specifications_cars',
      new TableForeignKey({
        name: 'FKCarSpecification',
        columnNames: ['carId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cars',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'specifications_cars',
      'FKCarSpecification'
    );

    await queryRunner.dropForeignKey(
      'specifications_cars',
      'FKSpecificationCar'
    );

    await queryRunner.dropTable('specifications_cars');
  }
}
