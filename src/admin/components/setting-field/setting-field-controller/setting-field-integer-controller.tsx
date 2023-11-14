import { useState, ChangeEvent } from "react";

import { Input } from "@medusajs/ui";

import { ControllerProps } from ".";

type SettingFieldIntegerController = ControllerProps<number> & {}

const SettingFieldIntegerController = ({
    defaultValue,
    onValueChange
}: SettingFieldIntegerController) => {

    const [value, setValue] = useState<number>(defaultValue);

    function handleValueChange(event: ChangeEvent<HTMLInputElement>) {
        const newValue = parseInt(event.target.value) | defaultValue;
        setValue(newValue);
        onValueChange(newValue);
    }

    return (
        <Input type="number" value={value} onChange={handleValueChange} />
    )
}

export default SettingFieldIntegerController;