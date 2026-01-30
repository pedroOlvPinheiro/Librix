import { MigrationInterface, QueryRunner } from "typeorm";

export class AuthEntity1768413121357 implements MigrationInterface {
    name = 'AuthEntity1768413121357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "email" TO "user_auth"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" TO "UQ_bacf47c041aade3ca7867ee7968"`);
        await queryRunner.query(`CREATE TABLE "auth" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_b54f616411ef3824f6a5c06ea46" UNIQUE ("email"), CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "loan" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."loan_status_enum" AS ENUM('active', 'returned', 'overdue')`);
        await queryRunner.query(`ALTER TABLE "loan" ADD "status" "public"."loan_status_enum" NOT NULL DEFAULT 'active'`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_bacf47c041aade3ca7867ee7968"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "user_auth"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "user_auth" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_bacf47c041aade3ca7867ee7968" UNIQUE ("user_auth")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_bacf47c041aade3ca7867ee7968" FOREIGN KEY ("user_auth") REFERENCES "auth"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_bacf47c041aade3ca7867ee7968"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_bacf47c041aade3ca7867ee7968"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "user_auth"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "user_auth" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_bacf47c041aade3ca7867ee7968" UNIQUE ("user_auth")`);
        await queryRunner.query(`ALTER TABLE "loan" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."loan_status_enum"`);
        await queryRunner.query(`ALTER TABLE "loan" ADD "status" character varying NOT NULL DEFAULT 'active'`);
        await queryRunner.query(`DROP TABLE "auth"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "UQ_bacf47c041aade3ca7867ee7968" TO "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "user_auth" TO "email"`);
    }

}
