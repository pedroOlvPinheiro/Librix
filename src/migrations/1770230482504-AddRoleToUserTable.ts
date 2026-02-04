import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleToUserTable1770230482504 implements MigrationInterface {
    name = 'AddRoleToUserTable1770230482504'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('USER', 'ADMIN')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" "public"."user_role_enum" NOT NULL DEFAULT 'USER'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }

}
