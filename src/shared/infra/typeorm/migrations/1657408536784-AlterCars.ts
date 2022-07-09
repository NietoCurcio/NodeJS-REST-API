import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterCars1657408536784 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('cars', 'category_id', 'categoryId');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('cars', 'categoryId', 'category_id');
  }
}
