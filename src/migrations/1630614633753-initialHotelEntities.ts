import { MigrationInterface, QueryRunner } from "typeorm";

export class initialHotelEntities1630614633753 implements MigrationInterface {
    name = "initialHotelEntities1630614633753"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"hotels\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, CONSTRAINT \"PK_2bb06797684115a1ba7c705fc7b\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"rooms\" (\"id\" SERIAL NOT NULL, \"number\" character varying NOT NULL, \"hotelId\" integer, CONSTRAINT \"PK_0368a2d7c215f2d0458a54933f2\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"beds\" (\"id\" SERIAL NOT NULL, \"isOccupied\" boolean NOT NULL, \"bookingId\" integer, \"roomId\" integer, \"hotelId\" integer, CONSTRAINT \"REL_47a8b2a891f3da98b35318ec20\" UNIQUE (\"bookingId\"), CONSTRAINT \"PK_2212ae7113d85a70dc65983e742\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"rooms\" ADD CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\" FOREIGN KEY (\"hotelId\") REFERENCES \"hotels\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"beds\" ADD CONSTRAINT \"FK_47a8b2a891f3da98b35318ec200\" FOREIGN KEY (\"bookingId\") REFERENCES \"bookings\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"beds\" ADD CONSTRAINT \"FK_ca1eabbd3e4280a6524fe6954dc\" FOREIGN KEY (\"roomId\") REFERENCES \"rooms\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"beds\" ADD CONSTRAINT \"FK_5f4988403c73cd29ca0aea2cd07\" FOREIGN KEY (\"hotelId\") REFERENCES \"hotels\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"beds\" DROP CONSTRAINT \"FK_5f4988403c73cd29ca0aea2cd07\"");
      await queryRunner.query("ALTER TABLE \"beds\" DROP CONSTRAINT \"FK_ca1eabbd3e4280a6524fe6954dc\"");
      await queryRunner.query("ALTER TABLE \"beds\" DROP CONSTRAINT \"FK_47a8b2a891f3da98b35318ec200\"");
      await queryRunner.query("ALTER TABLE \"rooms\" DROP CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\"");
      await queryRunner.query("DROP TABLE \"beds\"");
      await queryRunner.query("DROP TABLE \"rooms\"");
      await queryRunner.query("DROP TABLE \"hotels\"");
    }
}
