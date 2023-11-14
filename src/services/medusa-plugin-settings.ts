import { TransactionBaseService } from "@medusajs/medusa";

import { MedusaPluginSetting } from "../models/medusa-plugin-setting";

import MedusaPluginSettingRepository from "../repositories/medusa-plugin-setting"

import { PluginOptions } from "../types/plugin-options";
import { ExtendedSetting } from "../types/extended-setting";
import { SettingSchema, SettingSchemaOption, SettingSchemaOptions, SettingSchemaTypes } from "../types/setting-schema";
import { EntityManager } from "typeorm";

type InjectedDependencies = {
    manager: EntityManager;
    medusaPluginSettingRepository: typeof MedusaPluginSettingRepository;
};

export default class MedusaPluginSettingsService extends TransactionBaseService {

    protected options_: PluginOptions;
    protected medusaPluginSettingRepository_: typeof MedusaPluginSettingRepository;

    constructor(
        {
            manager,
            medusaPluginSettingRepository
        }: InjectedDependencies,
        options: PluginOptions,
    ) {
        super(arguments[0]);
        // super(...arguments);

        this.options_ = options;
        this.medusaPluginSettingRepository_ = medusaPluginSettingRepository;
    }

    /**
     * initializeSetting: create setting on database if not exist
     * initializeSettings: create all settings on database if not exist
     * 
     * listSettingsSchemas
     * retrieveSettingSchema
     * listDtabaseSettings
     * retrieveDatabaseSetting
     * updateDatabaseSetting
     * resetDatabaseSetting
     * resetDatabaseSettings
     */

    getRepository() {
        return this.activeManager_.withRepository(
            this.medusaPluginSettingRepository_
        );

    }

    listSettingsSchemas(): SettingSchema[] {
        return this.options_.settings;
    }

    retrieveSettingSchema(settingId: SettingSchema["id"]): SettingSchema | null {
        const setting = this.listSettingsSchemas().find((setting) => setting.id === settingId);
        return setting || null;
    }

    extendSetting(settingSchema: SettingSchema, setting: MedusaPluginSetting): ExtendedSetting {
        return {
            ...setting,
            ...settingSchema,
        }
    }

    validateSettingValue(settingId: SettingSchema["id"], unParsedValue: unknown): boolean {
        const settingSchema = this.retrieveSettingSchema(settingId);
        let parsedValue: unknown

        try {
            parsedValue = JSON.parse(unParsedValue as any);
        } catch (error) {
            console.log("[medusa-plugin-settings](service-validateSettingValue):", "failed parsing.");
            return false;
        }

        const value = parsedValue;

        switch (settingSchema.type) {
            case SettingSchemaTypes.BOOLEAN:
                console.log("validating-boolean");
                return typeof value === "boolean";
                break;
            case SettingSchemaTypes.INTEGER:
                return !Number.isNaN(value) && Number.isFinite(value) && Number.isInteger(value);
                break;
            case SettingSchemaTypes.NUMBER:
                return !Number.isNaN(value) && Number.isFinite(value) && typeof value === "number";
                break;
            case SettingSchemaTypes.SELECT:
                let options: SettingSchemaOption[];
                if (Array.isArray(settingSchema.options))
                    options = settingSchema.options;
                // else if (typeof value === "function")
                //     options = await settingSchema.options();
                else
                    return false;
                return typeof value === "string" && options.map((option) => option.value).includes(value);
                break;
            case SettingSchemaTypes.STRING:
                return typeof value === "string";
                break;
            case SettingSchemaTypes.STRING_ARRAY:
                return Array.isArray(value) && value.every((v) => typeof v === "string")
                break;
            default:
                console.log("default-:");
                return false;
                break;
        }
    }

    async initializeSetting(settingId: SettingSchema["id"], value?: unknown | undefined, extended: boolean = false): Promise<MedusaPluginSetting | false> {
        const settingSchema = this.retrieveSettingSchema(settingId);
        const setting = new MedusaPluginSetting();
        // TODO: check if it'll save it with new id
        setting.id = settingSchema.id;
        if (value) {
            const validation = this.validateSettingValue(settingId, value);
            if (!validation)
                return false;
            setting.value = value;
        } else {
            setting.value = settingSchema.defaultValue;
        }
        const initializedSetting = await this.getRepository().save(setting);
        return initializedSetting;
    }

    async initializeSettings(extended: boolean = false): Promise<MedusaPluginSetting[]> {
        // TODO: update it and make it use a single query
        const settingsSchemas = this.listSettingsSchemas();
        const initializedSettings = await Promise.all(settingsSchemas.map(async (settingSchema) => {
            const initializedSetting = await this.initializeSetting(settingSchema.id);
            return initializedSetting;
        }));
        const result = initializedSettings.filter((initializedSetting) => initializedSetting !== false) as MedusaPluginSetting[];
        return result;
    }

    async listSettings(extended: boolean = false): Promise<MedusaPluginSetting[]> {
        const settings = await this.getRepository().find();
        return settings;
    }

    async retrieveSetting(settingId: SettingSchema["id"], extended: boolean = false): Promise<MedusaPluginSetting | null> {
        const setting = await this.getRepository().findOneBy({ id: settingId });
        return setting;
    }

    async updateSetting(settingId: string, newSettingValue: unknown, extended: boolean = false): Promise<MedusaPluginSetting | false> {
        const settingSchema = this.retrieveSettingSchema(settingId);
        const setting = await this.retrieveSetting(settingSchema.id);
        const validation = this.validateSettingValue(settingSchema.id, newSettingValue);
        if (!validation)
            return false;
        setting.value = newSettingValue;
        const updatedSetting = await this.getRepository().save(setting);
        return updatedSetting;
    }

    async resetSettings(extended: boolean = false): Promise<MedusaPluginSetting[]> {
        // TODO: group everything in a single query
        const settingsSchemas = this.listSettingsSchemas();
        const resetedSettings = await Promise.all(settingsSchemas.map(async (settingSchema) => {
            const resetedSetting = this.resetSetting(settingSchema.id);
            return resetedSetting;
        }));
        return resetedSettings;
    }

    async resetSetting(settingId: SettingSchema["id"], extended: boolean = false): Promise<MedusaPluginSetting> {
        const settingSchema = this.retrieveSettingSchema(settingId);
        const setting = await this.retrieveSetting(settingId);
        setting.value = settingSchema.defaultValue;
        const reseteddSetting = await this.getRepository().save(setting);
        return reseteddSetting;
    }

    async deleteDatabaseSetting(settingId: SettingSchema["id"]): Promise<boolean> {
        const deleteResult = await this.getRepository().delete({
            id: settingId
        });
        return (deleteResult.affected || 1) === 1;
    }
}