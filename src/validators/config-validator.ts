import { AwilixContainer } from "awilix"

import { plainToInstance, Type } from "class-transformer";
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, validate, Validate, IsString, IsOptional, IsBoolean, IsArray, ValidateNested, IsEnum, ArrayMinSize, ArrayMaxSize } from "class-validator";

import { ConfigModule } from "@medusajs/medusa"

import { PluginOptions } from "../types/plugin-options";
import { SettingSchema, SettingSchemaOption, SettingSchemaTypes } from "../types/setting-schema";

import { PLUGIN_NAME } from "../constants";

import MedusaPluginSettingRepository from "../repository/medusa-plugin-setting";

import MedusaPluginSettingsService from "../services/medusa-plugin-settings";

@ValidatorConstraint({ name: 'isSettingSchemaDefaultValueValid', async: false })
export class IsSettingSchemaDefaultValueValid implements ValidatorConstraintInterface {
    validate(value: unknown, args: ValidationArguments) {
        const settingSchema = (args.object || {}) as SettingSchemaValidator;

        const settingSchemaId = settingSchema.id;

        const medusaPluginSettingsService = new MedusaPluginSettingsService({
            medusaPluginSettingRepository: MedusaPluginSettingRepository
        }, {
            backendUrl: "",
            settings: [settingSchema as any],
        });

        return medusaPluginSettingsService.validateSettingValue(settingSchemaId, value);
    }
}

class SettingSchemaOptionValidator implements SettingSchemaOption {
    @IsString()
    id: string;

    @IsString()
    value: string;

    @IsOptional()
    @IsString()
    label?: string;

    @IsOptional()
    @IsString()
    description?: string;
}

class SettingSchemaValidator {
    @IsOptional()
    @IsBoolean()
    confirmation?: boolean;

    @Validate(IsSettingSchemaDefaultValueValid)
    defaultValue: unknown;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsBoolean()
    freezed?: boolean;

    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsString()
    group?: string;

    @IsOptional()
    @IsBoolean()
    notification?: boolean;

    @IsEnum(SettingSchemaTypes)
    type: SettingSchemaTypes;

    @IsArray()
    @ValidateNested({ each: true })
    // @ArrayMinSize(0)
    // @ArrayMaxSize()
    @Type(() => SettingSchemaOptionValidator)
    options: SettingSchemaOptionValidator[];
}

class PluginOptionsValidator implements PluginOptions {
    @IsString()
    backendUrl: string;

    @IsOptional()
    @IsBoolean()
    enableUi?: boolean;

    @IsOptional()
    @IsBoolean()
    logging?: boolean;

    @IsArray()
    @ValidateNested({ each: true })
    // @ArrayMinSize(0)
    // @ArrayMaxSize()
    @Type(() => SettingSchemaValidator)
    settings: SettingSchema[];

    @IsOptional()
    @IsBoolean()
    shouldDeleteUnusedSettings?: boolean;
}

export default async (container: AwilixContainer, config: ConfigModule) => {
    console.info("[medusa-plugin-settings](configuration-validator):", "started");

    const medusaPluginSettingsService: MedusaPluginSettingsService = container.resolve(
        "medusaPluginSettingsService"
    );

    const configuration = config.plugins
        .find((plugin) =>
            typeof plugin === "object" &&
            plugin.resolve === PLUGIN_NAME
        );

    if (typeof configuration !== "object") {
        console.error("[medusa-plugin-settings](configuration-validator):", "no plugin configuration found.");
        // exit()
        return;
    }

    const options = configuration.options as PluginOptions;

    const validation = await validate(plainToInstance(PluginOptionsValidator, options));

    if (validation.length > 0) {
        console.error("[medusa-plugin-settings](configuration-validator):", "invalid plugin options provided.");
        // exit()
        return;
    }

    console.info("[medusa-plugin-settings](configuration-validator):", "completed");
}