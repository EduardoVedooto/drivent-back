import { MigrationInterface, QueryRunner } from "typeorm";

export class accommodationEntities1630616480615 implements MigrationInterface {
    name = "accommodationEntities1630616480615"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"accommodationType\" (\"id\" SERIAL NOT NULL, \"type\" character varying NOT NULL, CONSTRAINT \"PK_94d9ea85e17309700270812619f\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"accommodationTypeHotel\" (\"id\" SERIAL NOT NULL, \"accommodationTypeId\" integer, \"hotelId\" integer, CONSTRAINT \"PK_c83670ed1ba04a0766d71e957a2\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"accommodationTypeHotel\" ADD CONSTRAINT \"FK_03c201eacf0c9063354e45e2eb8\" FOREIGN KEY (\"accommodationTypeId\") REFERENCES \"accommodationType\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"accommodationTypeHotel\" ADD CONSTRAINT \"FK_79269a2f85f4423be34106ecea4\" FOREIGN KEY (\"hotelId\") REFERENCES \"hotels\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"accommodationTypeHotel\" DROP CONSTRAINT \"FK_79269a2f85f4423be34106ecea4\"");
      await queryRunner.query("ALTER TABLE \"accommodationTypeHotel\" DROP CONSTRAINT \"FK_03c201eacf0c9063354e45e2eb8\"");
      await queryRunner.query("DROP TABLE \"accommodationTypeHotel\"");
      await queryRunner.query("DROP TABLE \"accommodationType\"");
    }
}
