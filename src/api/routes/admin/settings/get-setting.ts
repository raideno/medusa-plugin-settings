import { MedusaError } from "@medusajs/utils";

import { Request, Response } from "express";

import { AdminGetSettingResponseBodyType as EndpointResponseBodyType } from "../../../../types/api/admin/get-setting-response-body-type";

import MedusaPluginSettingsService from "../../../../services/medusa-plugin-settings";

export default async (req: Request, res: Response): Promise<void> => {
    const medusaPluginSettingsService: MedusaPluginSettingsService = req.scope.resolve(
        "medusaPluginSettingsService"
    );

    const settingId = req.params["settingId"];

    const settingSchema = medusaPluginSettingsService.retrieveSettingSchema(settingId);

    if (!settingSchema || settingSchema === null || settingSchema === undefined)
        throw new MedusaError(
            MedusaError.Types.NOT_FOUND,
            `Setting with id "${settingId} don't exist.`
        );

    const setting = await medusaPluginSettingsService.retrieveSetting(settingSchema.id);

    const extendedSetting = medusaPluginSettingsService.extendSetting(settingSchema, setting);

    const response: EndpointResponseBodyType = { setting: extendedSetting };

    res.status(200).json(response);
};
