import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableBookings1630694907263 implements MigrationInterface {
    name = "AlterTableBookings1630694907263"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"bookings\" DROP CONSTRAINT \"FK_0cc0b74f7c83b8d154e888b32d3\"");
      await queryRunner.query("ALTER TABLE \"bookings\" DROP COLUMN \"hasHotel\"");
      await queryRunner.query("ALTER TABLE \"bookings\" DROP COLUMN \"hotelOptionId\"");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"bookings\" ADD \"hotelOptionId\" integer");
      await queryRunner.query("ALTER TABLE \"bookings\" ADD \"hasHotel\" boolean NOT NULL");
      await queryRunner.query("ALTER TABLE \"bookings\" ADD CONSTRAINT \"FK_0cc0b74f7c83b8d154e888b32d3\" FOREIGN KEY (\"hotelOptionId\") REFERENCES \"hotelOptions\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }
}
