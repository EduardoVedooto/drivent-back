import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableEnrollments1631789006269 implements MigrationInterface {
    name = "AlterTableEnrollments1631789006269"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"enrollments\" ADD \"image\" character varying NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"enrollments\" DROP COLUMN \"image\"");
    }
}
