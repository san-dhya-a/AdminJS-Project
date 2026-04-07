import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePageTable1775557093040 implements MigrationInterface {
    name = 'CreatePageTable1775557093040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`pages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`subtitle\` varchar(255) NULL, \`description\` text NOT NULL, \`pageType\` enum ('faq', 'regulamento') NOT NULL DEFAULT 'faq', \`content\` json NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`pages\``);
    }

}
