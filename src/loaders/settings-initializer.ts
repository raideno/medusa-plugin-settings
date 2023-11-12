/**
 * check that all the settings present in the options.settings array are present in the database and with the correct types and that they pass all the validations
 * in case there is some missing create them with default-values
 * in case there is some wrong overwrite them
 * in case there is some additional alert about it in the UI and the console
 */

import { AwilixContainer } from "awilix"

import { ConfigModule } from "@medusajs/medusa"

import MedusaPluginSettingsService from "../services/medusa-plugin-settings";
import { PLUGIN_NAME } from "../constants";
import { PluginOptions } from "../types/plugin-options";

export const settingsInitializerLoaderFunction = async (container: AwilixContainer, config: ConfigModule) => {
    console.info("[medusa-plugin-settings](settings-initializer):", "started");

    const configuration = config.plugins
        .find((plugin) =>
            typeof plugin === "object" &&
            plugin.resolve === PLUGIN_NAME
        );

    if (!configuration || configuration === undefined || typeof configuration !== "object") {
        console.error("[medusa-plugin-settings](settings-initializer):", "incorrect plugin configuration options.");
        // exit()
        return;
    }

    const options = configuration.options as PluginOptions;

    const medusaPluginSettingsService: MedusaPluginSettingsService = container.resolve(
        "medusaPluginSettingsService"
    );

    const settingsSchemas = medusaPluginSettingsService.listSettingsSchemas();
    const databaseSettings = await medusaPluginSettingsService.listSettings();

    for (let i = 0; i < settingsSchemas.length; i++) {
        const settingSchema = settingsSchemas[i];
        const correspondingDatabaseSetting = databaseSettings.find((setting) => setting.id === settingSchema.id);
        if (correspondingDatabaseSetting === undefined) {
            // SettingSchema isn't present on database
            // Initialize SettingSchema on database with default value
            console.warn("[medusa-plugin-settings](settings-initializer):", `setting with id ${settingSchema.id} wasn't present on database, initialized it.`);
            const initializedSetting = await medusaPluginSettingsService.initializeSetting(settingSchema.id);
            if (initializedSetting === false) {
                console.error("[medusa-plugin-settings](settings-initializer):", `failed to initialize setting with id ${settingSchema.id}, initializing value failed validation.`);
            } else {
                console.info("[medusa-plugin-settings](settings-initializer):", `initialized ${settingSchema.id} = ${initializedSetting.value}`);
            }
        } else {
            // Setting Schema is present on database
            // Get CorrespondingSettingSchema on database and validate it's value
            // Continue if value is valid
            // Reset to default value if value is invalid
            const validation = medusaPluginSettingsService.validateSettingValue(settingSchema.id, correspondingDatabaseSetting.value);
            if (!validation) {
                console.info("[medusa-plugin-settings](settings-initializer):", `value of setting with id ${settingSchema.id} haven't passed validation.`);
                console.info("[medusa-plugin-settings](settings-initializer):", `setting with id ${settingSchema.id} have been reseted.`);
            } else {
                console.info("[medusa-plugin-settings](settings-initializer):", `valid setting ${settingSchema.id} = ${correspondingDatabaseSetting.value}`);
            }
        }
    }

    const databaseUnusedSettings = databaseSettings.filter((databaseSetting) => settingsSchemas.find((s) => s.id === databaseSetting.id) === undefined);
    if (databaseUnusedSettings.length > 0) {
        console.info("[medusa-plugin-settings](settings-initializer):", `(${databaseUnusedSettings.length}) unused setting(s) are present on the database => will be deleted ?`, options.shouldDeleteUnusedSettings || false);
        if (options.shouldDeleteUnusedSettings === true) {
            await Promise.all(databaseUnusedSettings.map(async (databaseUnusedSetting) => {
                await medusaPluginSettingsService.deleteDatabaseSetting(databaseUnusedSetting.id);
            }));
            console.info("[medusa-plugin-settings](settings-initializer):", `deleted (${databaseUnusedSettings.length}) unused setting(s).`);
        }
    }

    console.info("[medusa-plugin-settings](settings-initializer):", "completed");
}