import { MedusaError } from "@medusajs/utils";

import { Request, Response } from "express";

import { AdminUpdateSettingResponseBodyType as EndpointResponseBodyType } from "../../../../types/api/admin/update-setting-response-body-type";
import { AdminUpdateSettingRequestBodyType as EndpointRequestBodyType } from "../../../../types/api/admin/update-setting-request-body-type";

import MedusaPluginSettingsService from "../../../../services/medusa-plugin-settings";

export default async (req: Request, res: Response): Promise<void> => {
    const medusaPluginSettingsService: MedusaPluginSettingsService = req.scope.resolve(
        "medusaPluginSettingsService"
    );

    const settingId = req.params["settingId"];

    const body = (req.body || {}) as EndpointRequestBodyType;

    const settingSchema = medusaPluginSettingsService.retrieveSettingSchema(settingId);

    if (!settingSchema || settingSchema === null || settingSchema === undefined)
        throw new MedusaError(
            MedusaError.Types.NOT_FOUND,
            `Setting with id "${settingId} don't exist.`
        );

    const validation = await medusaPluginSettingsService.validateSettingValue(settingId, body.value);

    if (!validation)
        throw new MedusaError(
            MedusaError.Types.NOT_FOUND,
            `New Setting value (${body.value}) failed validation.`
        );

    const updatedSetting = await medusaPluginSettingsService.updateSetting(settingId, body.value);

    if (updatedSetting === false)
        throw new MedusaError(
            MedusaError.Types.NOT_FOUND,
            `Update failed, unknown reason.`
        );

    const extendedUpdatedSetting = medusaPluginSettingsService.extendSetting(settingSchema, updatedSetting);

    const response: EndpointResponseBodyType = { updatedSetting: extendedUpdatedSetting };

    res.status(200).json(response);
};
