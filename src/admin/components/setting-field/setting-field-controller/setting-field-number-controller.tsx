import { useState, ChangeEvent } from "react";

import { Input } from "@medusajs/ui";

import { ControllerProps } from ".";

type SettingFieldNumberController = ControllerProps<number> & {}

const SettingFieldNumberController = ({
    defaultValue,
    onValueChange
}: SettingFieldNumberController) => {

    const [value, setValue] = useState<number>(defaultValue);

    function handleValueChange(event: ChangeEvent<HTMLInputElement>) {
        const newValue = parseFloat(event.target.value) | defaultValue;
        setValue(newValue);
        onValueChange(newValue);
    }

    return (
        <Input type="number" value={value} onChange={handleValueChange} />
    )
}

export default SettingFieldNumberController;