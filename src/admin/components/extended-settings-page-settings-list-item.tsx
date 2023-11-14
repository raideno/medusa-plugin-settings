import { ExtendedSetting } from "../../types/extended-setting"

import { useExtendedSettingPageContext } from "../contexts/extended-settings-page";

import SettingField from "./setting-field";

type ExtendedSettingsPageSettingsListItemProps = {
    setting: ExtendedSetting;
}

const ExtendedSettingsPageSettingsListItem = ({ setting }: ExtendedSettingsPageSettingsListItemProps) => {

    const { updateSettingValue } = useExtendedSettingPageContext();

    async function handleValueChange(value: unknown) {
        await updateSettingValue(setting.id, value);
    }

    return (
        <SettingField setting={setting} onValueChange={handleValueChange} />
    )
}

export default ExtendedSettingsPageSettingsListItem;