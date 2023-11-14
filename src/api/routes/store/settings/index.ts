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

import { PLUGIN_STORE_ROUTE_BASE_PATH } from "../../../../constants";

import getSetting from "./get-setting";
import getSettings from "./get-settings";

const router = Router();

export default (storeRouter: Router) => {
    // TODO: put it in a global variable
    storeRouter.use("/extended-settings", router);

    router.get("/", wrapHandler(getSettings));
    router.get("/:settingId", wrapHandler(getSetting));
};
