import { MigrationInterface, QueryRunner } from "typeorm";

export class AddQuantityColumnInBookTable1774545813759 implements MigrationInterface {
    name = 'AddQuantityColumnInBookTable1774545813759'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" ADD "quantity" numeric NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "quantity"`);
    }

}
