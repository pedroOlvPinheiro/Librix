import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAuthorTable1770991157412 implements MigrationInterface {
    name = 'CreateAuthorTable1770991157412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "author" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "bio" character varying, "birthDate" date, CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "author_book" ("id_book" uuid NOT NULL, "id_author" uuid NOT NULL, CONSTRAINT "PK_16b7b1965b588d89e93b2c27504" PRIMARY KEY ("id_book", "id_author"))`);
        await queryRunner.query(`CREATE INDEX "IDX_701382bb0f1b6b81f84c2dbef6" ON "author_book" ("id_book") `);
        await queryRunner.query(`CREATE INDEX "IDX_c05312138a8e88d0889a1671c0" ON "author_book" ("id_author") `);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "author"`);
        await queryRunner.query(`ALTER TABLE "author_book" ADD CONSTRAINT "FK_701382bb0f1b6b81f84c2dbef69" FOREIGN KEY ("id_book") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "author_book" ADD CONSTRAINT "FK_c05312138a8e88d0889a1671c0a" FOREIGN KEY ("id_author") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "author_book" DROP CONSTRAINT "FK_c05312138a8e88d0889a1671c0a"`);
        await queryRunner.query(`ALTER TABLE "author_book" DROP CONSTRAINT "FK_701382bb0f1b6b81f84c2dbef69"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "author" character varying NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c05312138a8e88d0889a1671c0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_701382bb0f1b6b81f84c2dbef6"`);
        await queryRunner.query(`DROP TABLE "author_book"`);
        await queryRunner.query(`DROP TABLE "author"`);
    }

}
