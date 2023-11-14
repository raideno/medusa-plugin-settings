import { MigrationInterface, QueryRunner } from "typeorm"

import { DATABASE_SETTINGS_TABLE_NAME } from "../constants";

export class MedusaPluginSettingCreate1699811476556 implements MigrationInterface {

    name = "MedusaPluginSettingCreate1699811476556"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            CREATE TABLE IF NOT EXISTS "${DATABASE_SETTINGS_TABLE_NAME}" 
            (
               "id" character varying NOT NULL,
               "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
               "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
               
               "value" character varying,
               
               CONSTRAINT "PK_c6fb082a31d2e3f4g5h6i7j8k9l" PRIMARY KEY ("id")
            )
        `
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "${DATABASE_SETTINGS_TABLE_NAME}"`);
    }

}
