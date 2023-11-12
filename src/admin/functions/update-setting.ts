import { BACKEND_URL } from ".";

import { PLUGIN_ADMIN_ROUTE_BASE_PATH } from "../../constants";

import { AdminUpdateSettingRequestBodyType as EndpointRequestBodyType } from "../../types/api/admin/update-setting-request-body-type";
import { AdminUpdateSettingResponseBodyType as EndpointResponseBodyType } from "../../types/api/admin/update-setting-response-body-type";

export default async (settingId: string, data_: EndpointRequestBodyType): Promise<EndpointResponseBodyType> => {
    const response = await fetch(BACKEND_URL + PLUGIN_ADMIN_ROUTE_BASE_PATH + `/${settingId}`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(data_),
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
    });

    let data = undefined;

    try {
        data = await response.json()
    } catch {
        console.log("[medusa-plugin-settings](update-setting):", "failed to convert to JSON.");
    }

    return data;
};