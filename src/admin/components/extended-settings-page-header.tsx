import { Heading, Text } from "@medusajs/ui";
import ResetSettingsButton from "./reset-settings-button";

type ExtendedSettingsPageHeaderProps = {

}

const ExtendedSettingsPageHeader = ({ }: ExtendedSettingsPageHeaderProps) => {
    return (
        <div className="mb-xlarge w-full bg-white rounded border border-border p-4">
            <div className="mb-xsmall w-full flex flex-row items-center justify-between">
                <Heading className="font-sans font-medium h1-core inter-2xlarge-semibold">Extended Settings</Heading>
                <ResetSettingsButton />
            </div>
            <Text className="font-normal font-sans txt-medium inter-base-regular text-grey-50">Here you'll be able to tweak and customize your store settings.</Text>
        </div>
    )
}

export default ExtendedSettingsPageHeader;