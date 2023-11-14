"use client"

import { Adjustments } from "@medusajs/icons"
import type { SettingProps, SettingConfig } from "@medusajs/admin"

import { SETTING_PAGE_CONFIG_CARD_DESCRIPTION, SETTING_PAGE_CONFIG_CARD_LABEL } from "../../../constants"

import { ExtendedSettingPageContextProvider } from "../../contexts/extended-settings-page"

import ExtendedSettingsPageHeader from "../../components/extended-settings-page-header"
import ExtendedSettingsPageActions from "../../components/extended-settings-page-actions"
import ExtendedSettingsPageSettingsListContainer from "../../components/extended-settings-page-settings-list-container"

export const config: SettingConfig = {
    card: {
        icon: Adjustments,
        label: "SETTING_PAGE_CONFIG_CARD_LABEL",
        description: "SETTING_PAGE_CONFIG_CARD_DESCRIPTION",
    },
}

const ExtendedSettingPage = ({
    notify,
}: SettingProps) => {

    return (
        <ExtendedSettingPageContextProvider>
            <div>
                <ExtendedSettingsPageHeader />
                <ExtendedSettingsPageSettingsListContainer />
                <ExtendedSettingsPageActions />
            </div>
        </ExtendedSettingPageContextProvider>
    )
}

export default ExtendedSettingPage