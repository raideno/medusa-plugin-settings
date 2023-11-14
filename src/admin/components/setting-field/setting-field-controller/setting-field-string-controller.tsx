import { useState, ChangeEvent } from "react";

import { Input } from "@medusajs/ui";

import { ControllerProps } from ".";

type SettingFieldStringController = ControllerProps<string> & {}

const SettingFieldStringController = ({
    defaultValue,
    onValueChange
}: SettingFieldStringController) => {

    const [value, setValue] = useState<string>(defaultValue);

    function handleValueChange(event: ChangeEvent<HTMLInputElement>) {
        const newValue = event.target.value;
        setValue(newValue);
        onValueChange(newValue);
    }

    return (
        <Input type="text" value={value} onChange={handleValueChange} />
    )
}

export default SettingFieldStringController;