import { isEqual } from "lodash";
import { createContext, useContext, useState, useEffect, useMemo } from "react";

import { useToast } from "@medusajs/ui";

import { Setting } from "../../types/setting";
import { ExtendedSetting } from "../../types/extended-setting";

import updateSetting from "../functions/update-setting";
import resetSetting from "../functions/reset-setting";

import { mutateSettings } from "../hooks/use-settings";
import useSetting, { mutateSetting } from "../hooks/use-setting";

type SettingContextType = {
    isFetchLoading: boolean;
    isFetchError: boolean;

    setting?: ExtendedSetting | undefined;
    oldSetting?: ExtendedSetting | undefined;

    updateSettingValue: (value: unknown) => Promise<void>;

    haveChangesBeenMade: boolean;

    save: () => Promise<void>;
    discard: () => Promise<void>;

    resetSettingToDefaultValue: () => Promise<void>;

    isSubmitLoading: boolean;
    isSubmitError: boolean;

    isDiscardLoading: boolean;
    isDiscardError: boolean;
}

const SettingContext = createContext<SettingContextType | null>(null);

type SettingContextProviderProps = {
    settingId: Setting["id"];
    children: React.ReactNode
}

export const SettingContextProvider = ({ settingId, children }: SettingContextProviderProps) => {

    const { toast } = useToast();

    const { data, error, isLoading } = useSetting(settingId);

    const [isFetchLoading, setIsFetchLoading] = useState<boolean>(false);
    const [isFetchError, setIsFetchError] = useState<boolean>(false);

    const [oldSetting, setOldSetting] = useState<ExtendedSetting | undefined>(undefined);
    const [setting, setSetting] = useState<ExtendedSetting | undefined>(undefined);

    const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
    const [isSubmitError, setIsSubmitError] = useState<boolean>(false);

    const [isDiscardLoading, setIsDiscardLoading] = useState<boolean>(false);
    const [isDiscardError, setIsDiscardError] = useState<boolean>(false);

    const haveChangesBeenMade = useMemo(() => {
        return isEqual(oldSetting, setting);
    }, [oldSetting, setting]);

    useEffect(() => {
        if (!isLoading) {
            setIsFetchLoading(false);
            if (!error) {
                setSetting(data.setting);
                setOldSetting(data.setting);
                setIsFetchError(true);
            } else {
                setSetting(undefined);
                setOldSetting(undefined);
                setIsFetchError(true);
            }
        } else {
            // IMPORTANT, do we need this ?
            // ---
            setSetting(undefined);
            setOldSetting(undefined);
            // ---
            setIsFetchLoading(true);
        }
    }, [isLoading, error])

    async function updateSettingValue(value: unknown) {
        const newSetting = JSON.parse(JSON.stringify(setting)) as typeof setting;
        newSetting.value = value;
        setSetting(newSetting);
    }

    async function save() {
        if (isFetchLoading || isDiscardLoading || isSubmitLoading)
            return;

        setIsSubmitLoading(true);

        try {
            const response = await updateSetting(settingId, {
                value: setting.value
            });
            setOldSetting(response.updatedSetting);
            setSetting(response.updatedSetting);
            toast({
                variant: "success",
                title: "Saved Setting.",
                description: "Changes that you made have been successfully saved."
            })
            // mutate setting on settings array
            await mutateSettings(async (oldData) => {
                const newData = JSON.parse(JSON.stringify(oldData)) as typeof oldData;
                const settingIndex = newData.settings.findIndex((setting) => setting.id === settingId);
                newData.settings[settingIndex] = response.updatedSetting;
                return newData;
            }, {
                revalidate: false,
                populateCache: true,
            });
            // mutate setting
            await mutateSetting(settingId, async (oldData) => ({ setting: response.updatedSetting }), { revalidate: false, populateCache: true })
        } catch (error) {
            setIsSubmitError(true)
            toast({
                variant: "error",
                title: "Failed to save Setting.",
                description: "Try again or check console for more details."
            });
            console.error("[medusa-plugin-setting](setting-context.save()):", error);
        } finally {
            setIsSubmitLoading(false)
        }
    }

    async function discard() {
        if (isFetchLoading || isDiscardLoading || isSubmitLoading)
            return;

        setIsDiscardLoading(true);
        try {
            setSetting(oldSetting);
        } catch (error) {
            setIsDiscardError(true);
            toast({
                variant: "error",
                title: "Failed to discard Setting changes.",
                description: "Try again or check console for more details."
            });
            console.error("[medusa-plugin-setting](setting-context.discard()):", error);
        } finally {
            setIsDiscardLoading(false);
        }
    }

    async function resetSettingToDefaultValue() {
        if (isFetchLoading || isDiscardLoading || isSubmitLoading)
            return;

        setIsSubmitLoading(true);
        try {
            const response = await resetSetting(settingId);
            setOldSetting(response.resetedSetting);
            setSetting(response.resetedSetting);
            toast({
                variant: "success",
                title: "Reseted Settings.",
                description: "Settings have be reseted to default values."
            })
            // mutate setting on settings array
            await mutateSettings(async (oldData) => {
                const newData = JSON.parse(JSON.stringify(oldData)) as typeof oldData;
                const settingIndex = newData.settings.findIndex((setting) => setting.id === settingId);
                newData.settings[settingIndex] = response.resetedSetting;
                return newData;
            }, {
                revalidate: false,
                populateCache: true,
            });
            // mutate setting
            await mutateSetting(settingId, async (oldData) => ({ setting: response.resetedSetting }), { revalidate: false, populateCache: true })
        } catch (error) {
            setIsSubmitError(true);
            toast({
                variant: "error",
                title: "Failed to reset Setting.",
                description: "Try again or check console for more details."
            });
            console.error("[medusa-plugin-setting](setting-context.resetSettingToDefaultValue()):", error);
        } finally {
            setIsSubmitLoading(false);
        }
    }


    return (
        <SettingContext.Provider
            value={{
                isFetchError,
                isFetchLoading,

                haveChangesBeenMade,

                setting,
                oldSetting,

                updateSettingValue,

                discard,
                save,

                resetSettingToDefaultValue,

                isDiscardError,
                isDiscardLoading,

                isSubmitError,
                isSubmitLoading,
            }}
        >
            {children}
        </SettingContext.Provider>
    )
}

export const useSettingContext = () => {
    const context = useContext(SettingContext);

    if (context === null) {
        throw new Error(
            "useSettingContext must be used within a SettingContextProvider"
        );
    }
    return context;
};