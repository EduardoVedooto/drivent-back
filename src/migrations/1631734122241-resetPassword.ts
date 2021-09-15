import { MigrationInterface, QueryRunner } from "typeorm";

export class resetPassword1631734122241 implements MigrationInterface {
    name = "resetPassword1631734122241"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"requestNewPassword\" (\"id\" SERIAL NOT NULL, \"token\" character varying NOT NULL, \"email\" character varying NOT NULL, \"createAt\" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT \"PK_6d032ce07a14cc9b5b4c5e42ab0\" PRIMARY KEY (\"id\"))");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("DROP TABLE \"requestNewPassword\"");
    }
}
