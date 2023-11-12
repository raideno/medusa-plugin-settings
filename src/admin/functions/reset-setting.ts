import { BACKEND_URL } from ".";

import { PLUGIN_ADMIN_ROUTE_BASE_PATH } from "../../constants";

import { AdminResetSettingResponseBodyType as EndpointResponseBodyType } from "../../types/api/admin/reset-setting-response-body-type";

export default async (settingId: string): Promise<EndpointResponseBodyType> => {
    const response = await fetch(BACKEND_URL + PLUGIN_ADMIN_ROUTE_BASE_PATH + `/${settingId}`, {
        method: "DELETE",
        credentials: "include",
    });

    let data = undefined;

    try {
        data = await response.json()
    } catch {
        console.log("[medusa-plugin-settings](reset-setting):", "failed to convert to JSON.");
    }

    return data;
};