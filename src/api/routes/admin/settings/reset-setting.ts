import { MedusaError } from "@medusajs/utils";

import { Request, Response } from "express";

import { AdminResetSettingResponseBodyType as EndpointResponseBodyType } from "../../../../types/api/admin/reset-setting-response-body-type";

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

    const resetedSetting = await medusaPluginSettingsService.resetSetting(settingSchema.id);

    const extendedResetedSetting = medusaPluginSettingsService.extendSetting(settingSchema, resetedSetting);

    const response: EndpointResponseBodyType = { resetedSetting: extendedResetedSetting };

    res.status(200).json(response);
};
