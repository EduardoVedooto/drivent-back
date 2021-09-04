import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableHotelOtions1630764946151 implements MigrationInterface {
    name = "AlterTableHotelOtions1630764946151"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"hotelOptions\" RENAME COLUMN \"hasHotel\" TO \"name\"");
      await queryRunner.query("ALTER TABLE \"hotelOptions\" DROP COLUMN \"name\"");
      await queryRunner.query("ALTER TABLE \"hotelOptions\" ADD \"name\" character varying NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"hotelOptions\" DROP COLUMN \"name\"");
      await queryRunner.query("ALTER TABLE \"hotelOptions\" ADD \"name\" boolean NOT NULL");
      await queryRunner.query("ALTER TABLE \"hotelOptions\" RENAME COLUMN \"name\" TO \"hasHotel\"");
    }
}
