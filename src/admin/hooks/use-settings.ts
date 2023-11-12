import useSWR, { mutate, MutatorOptions } from "swr";

import getSettings from "../functions/get-settings";

export const USE_SETTINGS_HOOK_KEY = () => `/settings/`;

export type useSettingsDataType = Awaited<
    ReturnType<typeof getSettings>
>;

export default () =>
    useSWR<useSettingsDataType>(
        USE_SETTINGS_HOOK_KEY(),
        getSettings.bind(null)
    );

export const mutateSetting = (
    data: (
        oldData: useSettingsDataType
    ) => Promise<useSettingsDataType>,
    options?: boolean | MutatorOptions<useSettingsDataType, useSettingsDataType>
) => {
    return mutate<useSettingsDataType>(
        USE_SETTINGS_HOOK_KEY(),
        data,
        options
    );
};