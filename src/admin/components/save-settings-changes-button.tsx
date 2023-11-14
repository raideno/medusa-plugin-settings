import { Button } from "@medusajs/ui";
import { useExtendedSettingPageContext } from "../contexts/extended-settings-page"

type SaveSettingsChangesButtonProps = {

}

const SaveSettingsChangesButton = ({ }: SaveSettingsChangesButtonProps) => {

    const { save, isSubmitLoading, isSubmitError, haveChangesBeenMade, loading } = useExtendedSettingPageContext();

    async function handleClick() {
        await save();
    }

    return (
        <Button variant="primary" disabled={!haveChangesBeenMade || loading} isLoading={isSubmitLoading} onClick={handleClick}>Save Changes.</Button>
    )
}

export default SaveSettingsChangesButton