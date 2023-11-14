import { VersionColumn, CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryColumn } from "typeorm";
import { DATABASE_SETTINGS_TABLE_NAME } from "../constants";

@Entity({
    name: DATABASE_SETTINGS_TABLE_NAME
})
export class MedusaPluginSetting {

    @PrimaryColumn({ type: "varchar", nullable: false })
    id: string;

    @Column({ type: "jsonb", nullable: true, default: null })
    value: unknown;

    // @VersionColumn()
    // version: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}