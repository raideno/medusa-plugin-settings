import { AwilixContainer } from "awilix"

import { ConfigModule } from "@medusajs/medusa"

import configValidator from "../validators/config-validator";
import migrationsChecker from "../validators/migrations-checker";
import settingsInitializer from "../validators/settings-initializer";
import { PluginOptions } from "../types/plugin-options";

export default async (
    container: AwilixContainer,
    config: PluginOptions,
): Promise<void> => {
    console.info("[medusa-plugin-settings](startup-loader):", "started.");

    try {
        await migrationsChecker(container, config);
    } catch (error) {
        console.error("[medusa-plugin-settings](startup-loader)(migrationsChecker):", "error:", error);
        // TODO: stop plugin working in case of false
    } finally {

    }

    try {
        await configValidator(container, config);
    } catch (error) {
        console.error("[medusa-plugin-settings](startup-loader)(configValidator):", "error:", error);
    } finally {

    }

    try {
        await settingsInitializer(container, config);
    } catch (error) {
        console.error("[medusa-plugin-settings](startup-loader)(settingsInitializer):", "error:", error);
    } finally {

    }

    console.info("[medusa-plugin-settings](startup-loader):", "completed.");
}