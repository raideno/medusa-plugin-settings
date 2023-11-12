import { Request, Response } from "express";

import { AdminGetSettingsResponseBodyType as EndpointResponseBodyType } from "../../../../types/api/admin/get-settings-response-body-type";

import MedusaPluginSettingsService from "../../../../services/medusa-plugin-settings";

export default async (req: Request, res: Response): Promise<void> => {
    const medusaPluginSettingsService: MedusaPluginSettingsService = req.scope.resolve(
        "medusaPluginSettingsService"
    );

    const settings = await medusaPluginSettingsService.listSettings();

    const extendedSettings = settings.map((setting) => medusaPluginSettingsService.extendSetting(medusaPluginSettingsService.retrieveSettingSchema(setting.id), setting))

    const response: EndpointResponseBodyType = { settings: extendedSettings };

    res.status(200).json(response);
};
