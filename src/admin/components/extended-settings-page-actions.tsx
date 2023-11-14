import DiscardSettingsChangesButton from "./discard-settings-changes-button";
import ResetSettingsButton from "./reset-settings-button";
import SaveSettingsChangesButton from "./save-settings-changes-button";

type ExtendedSettingsPageActionsProps = {

}

const ExtendedSettingsPageActions = ({ }: ExtendedSettingsPageActionsProps) => {
    return (
        <div className="w-full fixed bottom-0 p-4 left-0 bg-white border-t border-border flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
                <ResetSettingsButton />
                <DiscardSettingsChangesButton />
            </div>
            <div className="flex flex-row items-center gap-2">
                <SaveSettingsChangesButton />
            </div>
        </div>
    )
}

export default ExtendedSettingsPageActions;