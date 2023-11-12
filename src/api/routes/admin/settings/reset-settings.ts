import { MedusaError } from "@medusajs/utils";

import { Request, Response } from "express";

import { AdminResetSettingsResponseBodyType as EndpointResponseBodyType } from "../../../../types/api/admin/reset-settings-response-body-type";

import MedusaPluginSettingsService from "../../../../services/medusa-plugin-settings";

export default async (req: Request, res: Response): Promise<void> => {
    const medusaPluginSettingsService: MedusaPluginSettingsService = req.scope.resolve(
        "medusaPluginSettingsService"
    );

    const resetedSettings = await medusaPluginSettingsService.resetSettings();

    const extendedResetedSettings = resetedSettings.map((resetedSetting) => medusaPluginSettingsService.extendSetting(medusaPluginSettingsService.retrieveSettingSchema(resetedSetting.id), resetedSetting))

    const response: EndpointResponseBodyType = { resetedSettings: extendedResetedSettings };

    res.status(200).json(response);
};
