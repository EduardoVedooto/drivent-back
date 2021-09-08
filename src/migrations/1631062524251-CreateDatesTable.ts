import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatesTable1631062524251 implements MigrationInterface {
    name = "CreateDatesTable1631062524251"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"activities\" RENAME COLUMN \"date\" TO \"dateId\"");
      await queryRunner.query("CREATE TABLE \"dates\" (\"id\" SERIAL NOT NULL, \"day\" date NOT NULL, CONSTRAINT \"PK_401724822174c3539ee7036da15\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"activities\" DROP COLUMN \"dateId\"");
      await queryRunner.query("ALTER TABLE \"activities\" ADD \"dateId\" integer NOT NULL");
      await queryRunner.query("ALTER TABLE \"activities\" ADD CONSTRAINT \"FK_051a7a9104671baf216619e49f0\" FOREIGN KEY (\"dateId\") REFERENCES \"dates\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"activities\" DROP CONSTRAINT \"FK_051a7a9104671baf216619e49f0\"");
      await queryRunner.query("ALTER TABLE \"activities\" DROP COLUMN \"dateId\"");
      await queryRunner.query("ALTER TABLE \"activities\" ADD \"dateId\" TIMESTAMP WITH TIME ZONE NOT NULL");
      await queryRunner.query("DROP TABLE \"dates\"");
      await queryRunner.query("ALTER TABLE \"activities\" RENAME COLUMN \"dateId\" TO \"date\"");
    }
}
