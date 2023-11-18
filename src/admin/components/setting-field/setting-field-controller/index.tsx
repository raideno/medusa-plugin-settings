import { ExtendedSetting } from "../../../../types/extended-setting";
import { SettingSchemaTypes } from "../../../../types/setting-schema";

import SettingFieldTextController from "./setting-field-text-controller";
import SettingFieldNumberController from "./setting-field-number-controller";
import SettingFieldStringController from "./setting-field-string-controller";
import SettingFieldSelectController from "./setting-field-select-controller";
import SettingFieldIntegerController from "./setting-field-integer-controller";
import SettingFieldBooleanController from "./setting-field-boolean-controller";
import SettingFieldPasswordController from "./setting-field-password-controller";

export type ControllerProps<Type> = {
    defaultValue: Type;
    onValueChange: (value: Type) => void;
}

type SettingFieldControllerProps = {
    setting: ExtendedSetting;
    onValueChange: (value: unknown) => void;
}

const SettingFieldController = ({
    setting,
    onValueChange,
}: SettingFieldControllerProps) => {

    function handleValueChange<ValueType>(newValue: ValueType) {
        onValueChange(newValue);
    }

    switch (setting.type) {
        case SettingSchemaTypes.BOOLEAN:
            return (
                <SettingFieldBooleanController defaultValue={JSON.parse(setting.value as any) as boolean} onValueChange={handleValueChange} />
            )
            break;
        case SettingSchemaTypes.INTEGER:
            return (
                <SettingFieldIntegerController defaultValue={JSON.parse(setting.value as any) as number} onValueChange={handleValueChange} />
            );
            break;
        case SettingSchemaTypes.NUMBER:
            return (
                <SettingFieldNumberController defaultValue={JSON.parse(setting.value as any) as number} onValueChange={handleValueChange} />
            );
            break;
        case SettingSchemaTypes.PASSWORD:
            return (
                <SettingFieldPasswordController defaultValue={(setting.value as any) as string} onValueChange={handleValueChange} />
            );
            break;
        case SettingSchemaTypes.SELECT:
            return (
                <SettingFieldSelectController defaultValue={(setting.value as any) as string} onValueChange={handleValueChange} options={setting.options} />
            );
            break;
        case SettingSchemaTypes.STRING:
            return (
                <SettingFieldStringController defaultValue={(setting.value as any) as string} onValueChange={handleValueChange} />
            );
            break;
        case SettingSchemaTypes.TEXT:
            return (
                <SettingFieldTextController defaultValue={(setting.value as any) as string} onValueChange={handleValueChange} />
            );
            break;
        default:
            return (
                <div>Unrecognized Setting Type</div>
            )
            break;
    }
}

export default SettingFieldController