/**
 * GET get settings
 * GET get setting
 * PUT update setting
 * PUT update settings
 * DELETE reset setting
 * DELETE reset settings
 */

import { Router } from "express";

import { wrapHandler } from "@medusajs/medusa";

import { PLUGIN_ADMIN_ROUTE_BASE_PATH } from "../../../../constants";

import getSetting from "./get-setting";
import getSettings from "./get-settings";
import resetSetting from "./reset-setting";
import resetSettings from "./reset-settings";
import updateSetting from "./update-setting";
import updateSettings from "./update-settings";

const router = Router();

export default (adminRouter: Router) => {
    // TODO: put it in a global variable
    adminRouter.use("/extended-settings", router);

    router.get("/", wrapHandler(getSettings));
    router.get("/:settingId", wrapHandler(getSetting));
    router.put("/", wrapHandler(updateSettings));
    router.put("/:settingId", wrapHandler(updateSetting));
    router.delete("/", wrapHandler(resetSettings));
    router.delete("/:settingId", wrapHandler(resetSetting));
};
