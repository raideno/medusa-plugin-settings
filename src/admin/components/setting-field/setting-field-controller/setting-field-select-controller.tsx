import { useState } from "react";

import { Select } from "@medusajs/ui";

import { SettingSchemaOption } from "../../../../types/setting-schema";

import { ControllerProps } from ".";

type SettingFieldSelectController = ControllerProps<string> & {
    options: SettingSchemaOption[]
}

const SettingFieldSelectController = ({
    options,
    defaultValue,
    onValueChange
}: SettingFieldSelectController) => {

    const [value, setValue] = useState<string>(defaultValue);

    function handleValueChange(newValue: string) {
        setValue(newValue);
        onValueChange(newValue);
    }

    return (
        <Select value={value} onValueChange={handleValueChange}>
            <Select.Trigger>
                <Select.Value placeholder="Select Option." />
            </Select.Trigger>
            <Select.Content>
                {options.map((option) => (
                    <Select.Item key={option.id} value={option.value}>
                        {option.label}
                    </Select.Item>
                    // TODO: add the option description somewhere
                ))}
            </Select.Content>
        </Select>

    )
}

export default SettingFieldSelectController;