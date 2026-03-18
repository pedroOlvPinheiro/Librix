import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeletedAtColumnForSoftDeleteEntities1773854382165 implements MigrationInterface {
    name = 'AddDeletedAtColumnForSoftDeleteEntities1773854382165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "author" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "book" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "loan" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "auth" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "auth" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "loan" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "author" DROP COLUMN "deletedAt"`);
    }

}
