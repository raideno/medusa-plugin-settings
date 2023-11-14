import { useState } from "react";

import { Switch } from "@medusajs/ui";

import { ControllerProps } from ".";

type SettingFieldBooleanController = ControllerProps<boolean> & {}

const SettingFieldBooleanController = ({
    defaultValue,
    onValueChange
}: SettingFieldBooleanController) => {

    const [value, setValue] = useState<boolean>(defaultValue);

    function handleValueChange(newValue: boolean) {
        setValue(newValue);
        onValueChange(newValue);
    }

    return (
        <Switch checked={value} onCheckedChange={handleValueChange} />
    )
}

export default SettingFieldBooleanController;