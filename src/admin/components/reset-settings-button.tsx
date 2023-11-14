import { Trash } from "@medusajs/icons";
import { Button, Tooltip } from "@medusajs/ui";

import { useExtendedSettingPageContext } from "../contexts/extended-settings-page";

type ResetSettingsButtonProps = {

}

const ResetSettingsButton = ({ }: ResetSettingsButtonProps) => {

    const { resetSettingsToDefaultValues, isBeingResetedLoading, isBeingResetedError, loading } = useExtendedSettingPageContext();

    async function handleClick() {
        await resetSettingsToDefaultValues()
    }

    return (
        <Tooltip content="Reset Settings.">
            <Button disabled={loading} onClick={handleClick} isLoading={isBeingResetedLoading} variant="secondary">
                <Trash />
            </Button>
        </Tooltip>
    )
}

export default ResetSettingsButton;