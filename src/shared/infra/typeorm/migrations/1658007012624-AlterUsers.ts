import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUsers1658007012624 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      new TableColumn({
        name: 'id',
        type: 'uuid',
      }),
      new TableColumn({
        name: 'id',
        type: 'uuid',
        isPrimary: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      new TableColumn({
        name: 'id',
        type: 'uuid',
        isPrimary: true,
      }),
      new TableColumn({
        name: 'id',
        type: 'uuid',
      })
    );
  }
}
