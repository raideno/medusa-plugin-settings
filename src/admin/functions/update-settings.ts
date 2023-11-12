import { BACKEND_URL } from ".";

import { PLUGIN_ADMIN_ROUTE_BASE_PATH } from "../../constants";

import { AdminUpdateSettingsRequestBodyType as EndpointRequestBodyType } from "../../types/api/admin/update-settings-request-body-type";
import { AdminUpdateSettingsResponseBodyType as EndpointResponseBodyType } from "../../types/api/admin/update-settings-response-body-type";

export default async (data_: EndpointRequestBodyType): Promise<EndpointResponseBodyType> => {
    const response = await fetch(BACKEND_URL + PLUGIN_ADMIN_ROUTE_BASE_PATH, {
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
        console.log("[medusa-plugin-settings](update-settings):", "failed to convert to JSON.");
    }

    return data;
};