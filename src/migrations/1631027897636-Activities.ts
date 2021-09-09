import { MigrationInterface, QueryRunner } from "typeorm";

export class Activities1631027897636 implements MigrationInterface {
    name = "Activities1631027897636"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"activityLocation\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, CONSTRAINT \"PK_e1c5033a1305fde8afd85893f12\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"activities\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"date\" TIMESTAMP WITH TIME ZONE NOT NULL, \"startsAt\" character varying NOT NULL, \"endsAt\" character varying NOT NULL, \"activityLocationId\" integer NOT NULL, \"maxParticipants\" integer NOT NULL, CONSTRAINT \"PK_7f4004429f731ffb9c88eb486a8\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"activities\" ADD CONSTRAINT \"FK_52031273be47edf7eb1e19ec5a8\" FOREIGN KEY (\"activityLocationId\") REFERENCES \"activityLocation\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"activities\" DROP CONSTRAINT \"FK_52031273be47edf7eb1e19ec5a8\"");
      await queryRunner.query("DROP TABLE \"activities\"");
      await queryRunner.query("DROP TABLE \"activityLocation\"");
    }
}
