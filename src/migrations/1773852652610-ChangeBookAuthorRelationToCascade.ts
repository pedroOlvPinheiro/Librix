import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeBookAuthorRelationToCascade1773852652610 implements MigrationInterface {
    name = 'ChangeBookAuthorRelationToCascade1773852652610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "author_book" DROP CONSTRAINT "FK_701382bb0f1b6b81f84c2dbef69"`);
        await queryRunner.query(`ALTER TABLE "author_book" ADD CONSTRAINT "FK_701382bb0f1b6b81f84c2dbef69" FOREIGN KEY ("id_book") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "author_book" DROP CONSTRAINT "FK_701382bb0f1b6b81f84c2dbef69"`);
        await queryRunner.query(`ALTER TABLE "author_book" ADD CONSTRAINT "FK_701382bb0f1b6b81f84c2dbef69" FOREIGN KEY ("id_book") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

}
