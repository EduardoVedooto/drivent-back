import { MigrationInterface, QueryRunner } from "typeorm";

export class fixHasHotelType1630684837112 implements MigrationInterface {
    name = "fixHasHotelType1630684837112"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"hotelOptions\" DROP COLUMN \"hasHotel\"");
      await queryRunner.query("ALTER TABLE \"hotelOptions\" ADD \"hasHotel\" boolean NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"hotelOptions\" DROP COLUMN \"hasHotel\"");
      await queryRunner.query("ALTER TABLE \"hotelOptions\" ADD \"hasHotel\" character varying NOT NULL");
    }
}
