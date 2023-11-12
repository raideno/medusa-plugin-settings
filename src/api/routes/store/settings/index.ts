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
    storeRouter.use(PLUGIN_STORE_ROUTE_BASE_PATH, router);

    router.get("/", wrapHandler(getSettings));
    router.get("/:settingId", wrapHandler(getSetting));
};
