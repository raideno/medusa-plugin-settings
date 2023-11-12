import { MedusaError } from "@medusajs/utils";

import { Request, Response } from "express";

import { AdminUpdateSettingsResponseBodyType as EndpointResponseBodyType } from "../../../../types/api/admin/update-settings-response-body-type";
import { AdminUpdateSettingsRequestBodyType as EndpointRequestBodyType } from "../../../../types/api/admin/update-settings-request-body-type";

import MedusaPluginSettingsService from "../../../../services/medusa-plugin-settings";
import MedusaPluginSetting from "../../../../models/medusa-plugin-setting";

export default async (req: Request, res: Response): Promise<void> => {
    // TODO: in case one of the updates fail, rollback the update execution and throw an error

    const medusaPluginSettingsService: MedusaPluginSettingsService = req.scope.resolve(
        "medusaPluginSettingsService"
    );

    const body = (req.body || {}) as EndpointRequestBodyType;

    const settingsIds = Object.keys(body);

    const updatedSettings: MedusaPluginSetting[] = [];

    for (let i = 0; i < settingsIds.length; i++) {
        const settingId = settingsIds[i];
        const newSettingValue = body[settingId];
        const settingSchema = medusaPluginSettingsService.retrieveSettingSchema(settingId);
        if (!settingSchema || settingSchema === null || settingSchema === undefined)
            throw new MedusaError(
                MedusaError.Types.NOT_FOUND,
                `Invalid settingId provided in body "${settingId}.`
            );
        const validation = medusaPluginSettingsService.validateSettingValue(settingId, newSettingValue);
        if (!validation)
            throw new MedusaError(
                MedusaError.Types.NOT_FOUND,
                `setting with settingId (${settingId}) have been provided with invalid value (${newSettingValue}), validation failed.`
            );
        const updatedSetting = await medusaPluginSettingsService.updateSetting(settingId, newSettingValue);
        if (updatedSetting === false)
            throw new MedusaError(
                MedusaError.Types.NOT_FOUND,
                `Update failed, unknown reason.`
            );
        updatedSettings.push(updatedSetting);
    }

    const extendedUpdatedSettings = updatedSettings.map((updatedSetting) => medusaPluginSettingsService.extendSetting(medusaPluginSettingsService.retrieveSettingSchema(updatedSetting.id), updatedSetting))

    const response: EndpointResponseBodyType = { updatedSettings: extendedUpdatedSettings };

    res.status(200).json(response);
};
