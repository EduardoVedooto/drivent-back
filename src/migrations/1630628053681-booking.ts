import { MigrationInterface, QueryRunner } from "typeorm";

export class booking1630628053681 implements MigrationInterface {
    name = "booking1630628053681"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"hotelOptions\" (\"id\" SERIAL NOT NULL, \"hasHotel\" character varying NOT NULL, \"price\" integer NOT NULL, CONSTRAINT \"PK_57a64a7386b6c2f74c4d6ebf1e1\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"ticketOptions\" (\"id\" SERIAL NOT NULL, \"type\" character varying NOT NULL, \"price\" integer NOT NULL, CONSTRAINT \"PK_ef7d5867d25a65aa1f64db0790b\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"bookings\" (\"id\" SERIAL NOT NULL, \"isPaid\" boolean NOT NULL, \"hasHotel\" boolean NOT NULL, \"ticketOptionId\" integer, \"enrollmentId\" integer, \"hotelOptionId\" integer, CONSTRAINT \"REL_096186236398e943207a8591ef\" UNIQUE (\"enrollmentId\"), CONSTRAINT \"PK_bee6805982cc1e248e94ce94957\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"hotels\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, CONSTRAINT \"PK_2bb06797684115a1ba7c705fc7b\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"rooms\" (\"id\" SERIAL NOT NULL, \"number\" character varying NOT NULL, \"bedCount\" integer NOT NULL, \"hotelId\" integer, CONSTRAINT \"PK_0368a2d7c215f2d0458a54933f2\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"bookingRoom\" (\"id\" SERIAL NOT NULL, \"roomId\" integer, \"bookingId\" integer, CONSTRAINT \"REL_8f65a5cc942ab67bf0e3495601\" UNIQUE (\"bookingId\"), CONSTRAINT \"PK_37dc53dcecac95176c9f9bbc135\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"bookings\" ADD CONSTRAINT \"FK_461f87fb6840b1934b6c5c6fc5d\" FOREIGN KEY (\"ticketOptionId\") REFERENCES \"ticketOptions\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"bookings\" ADD CONSTRAINT \"FK_096186236398e943207a8591eff\" FOREIGN KEY (\"enrollmentId\") REFERENCES \"enrollments\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"bookings\" ADD CONSTRAINT \"FK_0cc0b74f7c83b8d154e888b32d3\" FOREIGN KEY (\"hotelOptionId\") REFERENCES \"hotelOptions\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"rooms\" ADD CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\" FOREIGN KEY (\"hotelId\") REFERENCES \"hotels\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"bookingRoom\" ADD CONSTRAINT \"FK_8c0d854cccde13e5bb147161543\" FOREIGN KEY (\"roomId\") REFERENCES \"rooms\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"bookingRoom\" ADD CONSTRAINT \"FK_8f65a5cc942ab67bf0e34956016\" FOREIGN KEY (\"bookingId\") REFERENCES \"bookings\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"bookingRoom\" DROP CONSTRAINT \"FK_8f65a5cc942ab67bf0e34956016\"");
      await queryRunner.query("ALTER TABLE \"bookingRoom\" DROP CONSTRAINT \"FK_8c0d854cccde13e5bb147161543\"");
      await queryRunner.query("ALTER TABLE \"rooms\" DROP CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\"");
      await queryRunner.query("ALTER TABLE \"bookings\" DROP CONSTRAINT \"FK_0cc0b74f7c83b8d154e888b32d3\"");
      await queryRunner.query("ALTER TABLE \"bookings\" DROP CONSTRAINT \"FK_096186236398e943207a8591eff\"");
      await queryRunner.query("ALTER TABLE \"bookings\" DROP CONSTRAINT \"FK_461f87fb6840b1934b6c5c6fc5d\"");
      await queryRunner.query("DROP TABLE \"bookingRoom\"");
      await queryRunner.query("DROP TABLE \"rooms\"");
      await queryRunner.query("DROP TABLE \"hotels\"");
      await queryRunner.query("DROP TABLE \"bookings\"");
      await queryRunner.query("DROP TABLE \"ticketOptions\"");
      await queryRunner.query("DROP TABLE \"hotelOptions\"");
    }
}
