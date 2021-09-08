import { MigrationInterface, QueryRunner } from "typeorm";

export class ActivitiesToBooking1631032693195 implements MigrationInterface {
    name = "ActivitiesToBooking1631032693195"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"activityBooking\" (\"id\" SERIAL NOT NULL, \"activityId\" integer NOT NULL, \"bookingId\" integer NOT NULL, CONSTRAINT \"PK_41048397d119e4c4f851738ed32\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"activityBooking\" ADD CONSTRAINT \"FK_04ccdd1c13403a04b3f86fbffa4\" FOREIGN KEY (\"activityId\") REFERENCES \"activities\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"activityBooking\" ADD CONSTRAINT \"FK_38ce595acc8d441223a5e081c78\" FOREIGN KEY (\"bookingId\") REFERENCES \"bookings\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"activityBooking\" DROP CONSTRAINT \"FK_38ce595acc8d441223a5e081c78\"");
      await queryRunner.query("ALTER TABLE \"activityBooking\" DROP CONSTRAINT \"FK_04ccdd1c13403a04b3f86fbffa4\"");
      await queryRunner.query("DROP TABLE \"activityBooking\"");
    }
}
