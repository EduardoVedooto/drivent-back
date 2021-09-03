import { MigrationInterface, QueryRunner } from "typeorm";

export class addHotelImage1630634006552 implements MigrationInterface {
    name = "addHotelImage1630634006552"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"hotels\" ADD \"imgUrl\" character varying NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"hotels\" DROP COLUMN \"imgUrl\"");
    }
}
