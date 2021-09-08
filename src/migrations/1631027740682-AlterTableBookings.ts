import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableBookings1631027740682 implements MigrationInterface {
    name = "AlterTableBookings1631027740682"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"bookings\" DROP CONSTRAINT \"FK_0cc0b74f7c83b8d154e888b32d3\"");
      await queryRunner.query("ALTER TABLE \"bookings\" ALTER COLUMN \"hotelOptionId\" SET NOT NULL");
      await queryRunner.query("ALTER TABLE \"bookings\" ADD CONSTRAINT \"FK_0cc0b74f7c83b8d154e888b32d3\" FOREIGN KEY (\"hotelOptionId\") REFERENCES \"hotelOptions\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"bookings\" DROP CONSTRAINT \"FK_0cc0b74f7c83b8d154e888b32d3\"");
      await queryRunner.query("ALTER TABLE \"bookings\" ALTER COLUMN \"hotelOptionId\" DROP NOT NULL");
      await queryRunner.query("ALTER TABLE \"bookings\" ADD CONSTRAINT \"FK_0cc0b74f7c83b8d154e888b32d3\" FOREIGN KEY (\"hotelOptionId\") REFERENCES \"hotelOptions\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }
}
