import { ExtendedSetting } from "../../../types/extended-setting";
import { SettingSchemaTypes } from "../../../types/setting-schema";
import SettingFieldContainer from "./setting-field-container";
import SettingFieldController from "./setting-field-controller";

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

    function handleValueChange(value: unknown) {
        onValueChange(value);
    }

    return (
        <SettingFieldContainer setting={setting}>
            <SettingFieldController setting={setting} onValueChange={handleValueChange} />
        </SettingFieldContainer>
    )
}

export default SettingField;