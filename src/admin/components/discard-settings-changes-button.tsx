import { Button } from "@medusajs/ui"
import { useExtendedSettingPageContext } from "../contexts/extended-settings-page"

type DiscardSettingsChangesButtonProps = {}

const DiscardSettingsChangesButton = ({ }: DiscardSettingsChangesButtonProps) => {
    const { discard, isDiscardLoading, isDiscardError, haveChangesBeenMade, loading } = useExtendedSettingPageContext();

    async function handleClick() {
        await discard();
    }

    return (
        <Button variant="secondary" disabled={!haveChangesBeenMade || loading} isLoading={isDiscardLoading} onClick={handleClick}>Discard Changes.</Button>
    )
}

export default DiscardSettingsChangesButton