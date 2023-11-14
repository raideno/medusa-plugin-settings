import { useExtendedSettingPageContext } from "../contexts/extended-settings-page"
import ExtendedSettingsPageSettingsListItem from "./extended-settings-page-settings-list-item";
import ExtendedSettingsPageSettingsListItemSkeleton from "./extended-settings-page-settings-list-item-skeleton";

{/* <> */ }

const SETTINGS_LIST_KEY_PREFIX = "setting-list-item-";
const SETTINGS_SKELETONS_LIST_KEY_PREFIX = "setting-list-item-skeleton-";

type ListContainerProps = {
    children: React.ReactNode[] | React.ReactNode;
}

const ListContainer = ({ children: items }: ListContainerProps) => {
    return (
        <div className="flex flex-col ga-2">
            {items}
        </div>
    )
}

type ExtendedSettingsPageSettingsListContainerProps = {

}

const ExtendedSettingsPageSettingsListContainer = ({ }: ExtendedSettingsPageSettingsListContainerProps) => {

    const { settings, isFetchLoading, isFetchError } = useExtendedSettingPageContext();

    if (isFetchLoading)
        return (
            <ListContainer>
                {new Array(6).fill(0).map((_, i) =>
                    <ExtendedSettingsPageSettingsListItemSkeleton key={SETTINGS_SKELETONS_LIST_KEY_PREFIX + i} />
                )}
            </ListContainer>
        )

    if (isFetchError)
        return (
            <div>Fetch Error.</div>
        )

    if (!settings || settings === undefined)
        return (
            <div>Invalid Settings.</div>
        )

    if (settings.length === 0)
        return (
            <div>No Settings.</div>
        )

    return (
        <ListContainer>
            {settings.map((setting) =>
                <ExtendedSettingsPageSettingsListItem key={SETTINGS_LIST_KEY_PREFIX + setting.id} setting={setting} />
            )}
        </ListContainer>
    )

}

export default ExtendedSettingsPageSettingsListContainer;