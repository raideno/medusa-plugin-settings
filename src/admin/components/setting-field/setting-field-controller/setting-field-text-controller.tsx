import { useState, ChangeEvent } from "react";

import { Input, Textarea } from "@medusajs/ui";

import { ControllerProps } from ".";

type SettingFieldTextController = ControllerProps<string> & {}

const SettingFieldTextController = ({
    defaultValue,
    onValueChange
}: SettingFieldTextController) => {

    const [value, setValue] = useState<string>(defaultValue);

    function handleValueChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const newValue = event.target.value;
        setValue(newValue);
        onValueChange(newValue);
    }

    return (
        <Textarea value={value} onChange={handleValueChange} />
    )
}

export default SettingFieldTextController;