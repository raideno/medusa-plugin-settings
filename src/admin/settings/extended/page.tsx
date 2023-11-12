import type { SettingProps, SettingConfig } from "@medusajs/admin"

import { SETTING_PAGE_CONFIG_CARD_DESCRIPTION, SETTING_PAGE_CONFIG_CARD_LABEL } from "../../../constants"


export const config: SettingConfig = {
    card: {
        label: SETTING_PAGE_CONFIG_CARD_LABEL,
        description: SETTING_PAGE_CONFIG_CARD_DESCRIPTION,
    },
}

const ExtendedSettingPage = ({
    notify,
}: SettingProps) => {

    const handleClick = () => {
        notify.success("Success", "You clicked the button")
    }

    return (
        <div>
            <h1>Custom Setting Page</h1>
            <button onClick={handleClick}>
                Click Me
            </button>
        </div>
    )
}

export default ExtendedSettingPage