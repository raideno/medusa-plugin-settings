import { ExtendedSetting } from "../../extended-setting";

export type AdminUpdateSettingsResponseBodyType = {
    updatedSettings: ExtendedSetting[];
    // updateFailedSettings: {
    //     [settingId: string]: string
    // }
};