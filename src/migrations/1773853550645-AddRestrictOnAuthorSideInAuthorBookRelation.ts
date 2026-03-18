import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRestrictOnAuthorSideInAuthorBookRelation1773853550645 implements MigrationInterface {
    name = 'AddRestrictOnAuthorSideInAuthorBookRelation1773853550645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "author_book" DROP CONSTRAINT "FK_c05312138a8e88d0889a1671c0a"`);
        await queryRunner.query(`ALTER TABLE "author_book" ADD CONSTRAINT "FK_c05312138a8e88d0889a1671c0a" FOREIGN KEY ("id_author") REFERENCES "author"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "author_book" DROP CONSTRAINT "FK_c05312138a8e88d0889a1671c0a"`);
        await queryRunner.query(`ALTER TABLE "author_book" ADD CONSTRAINT "FK_c05312138a8e88d0889a1671c0a" FOREIGN KEY ("id_author") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
