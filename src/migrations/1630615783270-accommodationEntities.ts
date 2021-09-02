import { MigrationInterface, QueryRunner } from "typeorm";

export class accommodationEntities1630615783270 implements MigrationInterface {
    name = "accommodationEntities1630615783270"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"accommodationType\" (\"id\" SERIAL NOT NULL, \"type\" character varying NOT NULL, CONSTRAINT \"PK_94d9ea85e17309700270812619f\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"AccommodationTypeHotel\" (\"id\" SERIAL NOT NULL, \"accommodationTypeId\" integer, \"hotelId\" integer, CONSTRAINT \"PK_fe52420625b4ea54111b76b09d8\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"AccommodationTypeHotel\" ADD CONSTRAINT \"FK_b94c653c114c9434d033e6d7344\" FOREIGN KEY (\"accommodationTypeId\") REFERENCES \"accommodationType\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"AccommodationTypeHotel\" ADD CONSTRAINT \"FK_985e03d4ff96537e171bd0af5fd\" FOREIGN KEY (\"hotelId\") REFERENCES \"hotels\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"AccommodationTypeHotel\" DROP CONSTRAINT \"FK_985e03d4ff96537e171bd0af5fd\"");
      await queryRunner.query("ALTER TABLE \"AccommodationTypeHotel\" DROP CONSTRAINT \"FK_b94c653c114c9434d033e6d7344\"");
      await queryRunner.query("DROP TABLE \"AccommodationTypeHotel\"");
      await queryRunner.query("DROP TABLE \"accommodationType\"");
    }
}
