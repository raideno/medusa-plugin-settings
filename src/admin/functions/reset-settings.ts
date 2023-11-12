import { BACKEND_URL } from ".";

import { PLUGIN_ADMIN_ROUTE_BASE_PATH } from "../../constants";

import { AdminResetSettingsResponseBodyType as EndpointResponseBodyType } from "../../types/api/admin/reset-settings-response-body-type";

export default async (): Promise<EndpointResponseBodyType> => {
    const response = await fetch(BACKEND_URL + PLUGIN_ADMIN_ROUTE_BASE_PATH, {
        method: "DELETE",
        credentials: "include",
    });

    let data = undefined;

    try {
        data = await response.json()
    } catch {
        console.log("[medusa-plugin-settings](reset-settings):", "failed to convert to JSON.");
    }

    return data;
};