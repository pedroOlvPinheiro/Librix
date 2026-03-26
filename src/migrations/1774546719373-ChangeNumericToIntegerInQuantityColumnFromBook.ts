import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeNumericToIntegerInQuantityColumnFromBook1774546719373 implements MigrationInterface {
    name = 'ChangeNumericToIntegerInQuantityColumnFromBook1774546719373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "quantity" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "quantity" numeric NOT NULL DEFAULT '0'`);
    }

}
