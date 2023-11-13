import { isEqual } from "lodash";
import { createContext, useContext, useState, useEffect, useMemo } from "react";

import { useToast } from "@medusajs/ui";

import { ExtendedSetting } from "../../types/extended-setting"

import resetSettings from "../functions/reset-settings";
import updateSettings from "../functions/update-settings";

import { mutateSetting } from "../hooks/use-setting";
import useSettings, { mutateSettings } from "../hooks/use-settings";

type ExtendedSettingPageContextType = {

    isFetchLoading: boolean;
    isFetchError: boolean;

    settings?: ExtendedSetting[] | undefined;
    oldSettings?: ExtendedSetting[] | undefined;

    updateSettingValue: (settingId: string, value: unknown) => Promise<void>;

    haveChangesBeenMade: boolean;

    save: () => Promise<void>;
    discard: () => Promise<void>;

    resetSettingsToDefaultValues: () => Promise<void>;

    isSubmitLoading: boolean;
    isSubmitError: boolean;

    isDiscardLoading: boolean;
    isDiscardError: boolean;
}

const ExtendedSettingPageContext = createContext<ExtendedSettingPageContextType | null>(null);

type ExtendedSettingPageContextProviderProps = {
    children: React.ReactNode
}

/**
 * reset-setting
 */

export const ExtendedSettingPageContextProvider = ({ children }: ExtendedSettingPageContextProviderProps) => {

    const { toast } = useToast();

    const { data, error, isLoading } = useSettings();

    const [isFetchLoading, setIsFetchLoading] = useState<boolean>(false);
    const [isFetchError, setIsFetchError] = useState<boolean>(false);

    const [oldSettings, setOldSettings] = useState<ExtendedSetting[] | undefined>(undefined);
    const [settings, setSettings] = useState<ExtendedSetting[] | undefined>(undefined);

    const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
    const [isSubmitError, setIsSubmitError] = useState<boolean>(false);

    const [isDiscardLoading, setIsDiscardLoading] = useState<boolean>(false);
    const [isDiscardError, setIsDiscardError] = useState<boolean>(false);

    const haveChangesBeenMade = useMemo(() => {
        return isEqual(oldSettings, settings);
    }, [oldSettings, settings]);

    useEffect(() => {
        if (!isLoading) {
            setIsFetchLoading(false);
            if (!error) {
                setSettings(data.settings);
                setOldSettings(data.settings);
                setIsFetchError(true);
            } else {
                setSettings(undefined);
                setOldSettings(undefined);
                setIsFetchError(true);
            }
        } else {
            // IMPORTANT, do we need this ?
            // ---
            setSettings(undefined);
            setOldSettings(undefined);
            // ---
            setIsFetchLoading(true);
        }
    }, [isLoading, error])

    async function updateSettingValue(settingId: string, value: unknown) {
        const newSettings = JSON.parse(JSON.stringify(settings)) as typeof settings;
        const settingIndex = newSettings.findIndex((setting) => setting.id === settingId);
        newSettings[settingIndex].value = value;
        setSettings(newSettings);
    }

    async function save() {
        if (isFetchLoading || isDiscardLoading || isSubmitLoading)
            return;

        setIsSubmitLoading(true);

        try {
            const data: { [settingId: string]: unknown } = {};
            (settings).forEach((setting) => data[setting.id] = setting.value);
            const response = await updateSettings(data);
            setOldSettings(response.updatedSettings);
            setSettings(response.updatedSettings);
            toast({
                variant: "success",
                title: "Saved Settings.",
                description: "Changes that you made have been successfully saved."
            })
            // mutate settings
            await mutateSettings(async (oldData) => ({ settings: response.updatedSettings }), {
                revalidate: false,
                populateCache: true,
            });
            // mutate each individual setting
            await Promise.all(response.updatedSettings.map(async (updatedSetting) => {
                await mutateSetting(updatedSetting.id, async (oldData) => ({ setting: updatedSetting }), {
                    revalidate: false,
                    populateCache: true,
                })
            }));
        } catch (error) {
            setIsSubmitError(true)
            toast({
                variant: "error",
                title: "Failed to save Settings.",
                description: "Try again or check console for more details."
            });
            console.error("[medusa-plugin-settings](extended-settings-page-context.save()):", error);
        } finally {
            setIsSubmitLoading(false)
        }
    }

    async function discard() {
        if (isFetchLoading || isDiscardLoading || isSubmitLoading)
            return;

        setIsDiscardLoading(true);
        try {
            setSettings(oldSettings);
        } catch (error) {
            setIsDiscardError(true);
            toast({
                variant: "error",
                title: "Failed to discard Settings changes.",
                description: "Try again or check console for more details."
            });
            console.error("[medusa-plugin-settings](extended-settings-page-context.discard()):", error);
        } finally {
            setIsDiscardLoading(false);
        }
    }

    async function resetSettingsToDefaultValues() {
        if (isFetchLoading || isDiscardLoading || isSubmitLoading)
            return;

        setIsSubmitLoading(true);
        try {
            const response = await resetSettings();
            setOldSettings(response.resetedSettings);
            setSettings(response.resetedSettings);
            toast({
                variant: "success",
                title: "Reseted Settings.",
                description: "Settings have be reseted to default values."
            })
            // mutate settings
            await mutateSettings(async (oldData) => ({ settings: response.resetedSettings }), {
                revalidate: false,
                populateCache: true,
            });
            // mutate each individual setting
            await Promise.all(response.resetedSettings.map(async (updatedSetting) => {
                await mutateSetting(updatedSetting.id, async (oldData) => ({ setting: updatedSetting }), { revalidate: false, populateCache: true })
            }));
        } catch (error) {
            setIsSubmitError(true);
            toast({
                variant: "error",
                title: "Failed to reset Settings.",
                description: "Try again or check console for more details."
            });
            console.error("[medusa-plugin-settings](extended-settings-page-context.resetSettingsToDefaultValues()):", error);
        } finally {
            setIsSubmitLoading(false);
        }
    }

    return (
        <ExtendedSettingPageContext.Provider
            value={{
                isFetchError,
                isFetchLoading,

                haveChangesBeenMade,

                settings,
                oldSettings,

                updateSettingValue,

                discard,
                save,

                resetSettingsToDefaultValues,

                isDiscardError,
                isDiscardLoading,

                isSubmitError,
                isSubmitLoading,
            }}
        >
            {children}
        </ExtendedSettingPageContext.Provider>
    );
}

export const useExtendedSettingPageContext = () => {
    const context = useContext(ExtendedSettingPageContext);

    if (context === null) {
        throw new Error(
            "useExtendedSettingPageContext must be used within a ExtendedSettingPageContextProvider"
        );
    }
    return context;
};