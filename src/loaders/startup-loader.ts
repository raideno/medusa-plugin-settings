import { AwilixContainer } from "awilix"

import { ConfigModule } from "@medusajs/medusa"

import configValidator from "../validators/config-validator";
import settingsInitializer from "../validators/settings-initializer";

export default async (
    container: AwilixContainer,
    config: ConfigModule
): Promise<void> => {
    console.info("[medusa-plugin-settings](startup-loader):", "started.");

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