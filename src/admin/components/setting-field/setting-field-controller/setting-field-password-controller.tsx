import { useState, ChangeEvent } from "react";

import { Input } from "@medusajs/ui";

import { ControllerProps } from ".";

type SettingFieldPasswordController = ControllerProps<string> & {}

const SettingFieldPasswordController = ({
    defaultValue,
    onValueChange
}: SettingFieldPasswordController) => {

    const [value, setValue] = useState<string>(defaultValue);

    function handleValueChange(event: ChangeEvent<HTMLInputElement>) {
        const newValue = event.target.value;
        setValue(newValue);
        onValueChange(newValue);
    }

    return (
        <Input type="password" value={value} onChange={handleValueChange} />
    )
}

export default SettingFieldPasswordController;