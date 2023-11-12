import { VersionColumn, CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class MedusaPluginSetting {

    @PrimaryColumn()
    @Column({ type: "varchar", nullable: false })
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