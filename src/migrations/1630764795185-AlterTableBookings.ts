import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableBookings1630764795185 implements MigrationInterface {
    name = "AlterTableBookings1630764795185"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"bookings\" DROP COLUMN \"hasHotel\"");
      await queryRunner.query("ALTER TABLE \"hotelOptions\" DROP COLUMN \"hasHotel\"");
      await queryRunner.query("ALTER TABLE \"hotelOptions\" ADD \"hasHotel\" boolean NOT NULL");
      await queryRunner.query("ALTER TABLE \"bookings\" DROP CONSTRAINT \"FK_096186236398e943207a8591eff\"");
      await queryRunner.query("ALTER TABLE \"bookings\" DROP CONSTRAINT \"FK_461f87fb6840b1934b6c5c6fc5d\"");
      await queryRunner.query("ALTER TABLE \"bookings\" ALTER COLUMN \"enrollmentId\" SET NOT NULL");
      await queryRunner.query("ALTER TABLE \"bookings\" ALTER COLUMN \"ticketOptionId\" SET NOT NULL");
      await queryRunner.query("ALTER TABLE \"bookings\" ADD CONSTRAINT \"FK_096186236398e943207a8591eff\" FOREIGN KEY (\"enrollmentId\") REFERENCES \"enrollments\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"bookings\" ADD CONSTRAINT \"FK_461f87fb6840b1934b6c5c6fc5d\" FOREIGN KEY (\"ticketOptionId\") REFERENCES \"ticketOptions\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"bookings\" DROP CONSTRAINT \"FK_461f87fb6840b1934b6c5c6fc5d\"");
      await queryRunner.query("ALTER TABLE \"bookings\" DROP CONSTRAINT \"FK_096186236398e943207a8591eff\"");
      await queryRunner.query("ALTER TABLE \"bookings\" ALTER COLUMN \"ticketOptionId\" DROP NOT NULL");
      await queryRunner.query("ALTER TABLE \"bookings\" ALTER COLUMN \"enrollmentId\" DROP NOT NULL");
      await queryRunner.query("ALTER TABLE \"bookings\" ADD CONSTRAINT \"FK_461f87fb6840b1934b6c5c6fc5d\" FOREIGN KEY (\"ticketOptionId\") REFERENCES \"ticketOptions\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"bookings\" ADD CONSTRAINT \"FK_096186236398e943207a8591eff\" FOREIGN KEY (\"enrollmentId\") REFERENCES \"enrollments\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"hotelOptions\" DROP COLUMN \"hasHotel\"");
      await queryRunner.query("ALTER TABLE \"hotelOptions\" ADD \"hasHotel\" character varying NOT NULL");
      await queryRunner.query("ALTER TABLE \"bookings\" ADD \"hasHotel\" boolean NOT NULL");
    }
}
