import { ExtendedSetting } from "../../../types/extended-setting";
import { SettingSchemaTypes } from "../../../types/setting-schema";

type SettingFieldProps = {
    // value: unknown;
    // defaultValue: unknown;
    // type: SettingSchemaTypes;
    setting: ExtendedSetting;
    // ---
    onValueChange: (value: unknown) => void;
}

const SettingField = ({
    // defaultValue,
    // type,
    // value,
    setting,
    onValueChange,
}: SettingFieldProps) => {

    switch (setting.type) {
        case SettingSchemaTypes.BOOLEAN:
            return (
                <div>SettingField-BOOLEAN</div>
            )
            break;
        case SettingSchemaTypes.INTEGER:
            <div>SettingField-INTEGER</div>
            break;
        case SettingSchemaTypes.NUMBER:
            <div>SettingField-NUMBER</div>
            break;
        case SettingSchemaTypes.PASSWORD:
            <div>SettingField-PASSWORD</div>
            break;
        case SettingSchemaTypes.SELECT:
            <div>SettingField-SELECT</div>
            break;
        case SettingSchemaTypes.STRING:
            <div>SettingField-STRING</div>
            break;
        case SettingSchemaTypes.STRING_ARRAY:
            <div>SettingField-STRING_ARRAY</div>
            break;
        case SettingSchemaTypes.TEXT:
            <div>SettingField-TEXT</div>
            break;
        default:
            break;
    }
}

export default SettingField;