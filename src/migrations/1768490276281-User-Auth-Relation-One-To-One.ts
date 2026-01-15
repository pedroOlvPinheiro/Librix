import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAuthRelationOneToOne1768490276281 implements MigrationInterface {
    name = 'UserAuthRelationOneToOne1768490276281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_bacf47c041aade3ca7867ee7968"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_bacf47c041aade3ca7867ee7968"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "user_auth"`);
        await queryRunner.query(`ALTER TABLE "auth" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "auth" ADD CONSTRAINT "UQ_9922406dc7d70e20423aeffadf3" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "auth" ADD CONSTRAINT "FK_9922406dc7d70e20423aeffadf3" FOREIGN KEY ("user_id") REFERENCES "auth"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth" DROP CONSTRAINT "FK_9922406dc7d70e20423aeffadf3"`);
        await queryRunner.query(`ALTER TABLE "auth" DROP CONSTRAINT "UQ_9922406dc7d70e20423aeffadf3"`);
        await queryRunner.query(`ALTER TABLE "auth" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "user_auth" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_bacf47c041aade3ca7867ee7968" UNIQUE ("user_auth")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_bacf47c041aade3ca7867ee7968" FOREIGN KEY ("user_auth") REFERENCES "auth"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
