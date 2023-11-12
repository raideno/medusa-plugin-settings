import useSWR, { mutate, MutatorOptions } from "swr";

import getSetting from "../functions/get-setting";

export const USE_SETTING_HOOK_KEY = (settingId: string) => `/settings/${settingId}/`;

export type useSettingDataType = Awaited<
    ReturnType<typeof getSetting>
>;

export default (settingId: string) =>
    useSWR<useSettingDataType>(
        USE_SETTING_HOOK_KEY(settingId),
        getSetting.bind(null, settingId)
    );

export const mutateSetting = (
    settingId: string,
    data: (
        oldData: useSettingDataType
    ) => Promise<useSettingDataType>,
    options?: boolean | MutatorOptions<useSettingDataType, useSettingDataType>
) => {
    return mutate<useSettingDataType>(
        USE_SETTING_HOOK_KEY(settingId),
        data,
        options
    );
};