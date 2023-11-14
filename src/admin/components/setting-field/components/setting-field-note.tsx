import { InformationCircleSolid } from "@medusajs/icons";
import { ExtendedSetting } from "../../../../types/extended-setting"
import { Button, Tooltip } from "@medusajs/ui";

type SettingFieldNoteProps = {
    setting: ExtendedSetting;
}

const SettingFieldNote = ({
    setting
}: SettingFieldNoteProps) => {

    if (!setting.note)
        return null;

    return (
        <Tooltip content={setting.note}>
            <Button variant="transparent">
                <InformationCircleSolid />
            </Button>
        </Tooltip>
    )
}

export default SettingFieldNote