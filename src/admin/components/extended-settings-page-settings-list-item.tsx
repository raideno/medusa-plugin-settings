import { ExtendedSetting } from "../../types/extended-setting"

type ExtendedSettingsPageSettingsListItemProps = {
    setting: ExtendedSetting;
}

const ExtendedSettingsPageSettingsListItem = ({ setting }: ExtendedSettingsPageSettingsListItemProps) => {
    return (
        <div>{setting.name}= {String(setting.value)}</div>
    )
}

export default ExtendedSettingsPageSettingsListItem;