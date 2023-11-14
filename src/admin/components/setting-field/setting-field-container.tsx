import { Text, clx } from "@medusajs/ui";
import { ExtendedSetting } from "../../../types/extended-setting";
import SettingFieldNote from "./components/setting-field-note";
import getSettingName from "../../utils/get-setting-name";

type SettingFieldContainerProps = React.HTMLAttributes<HTMLDivElement> & {
    // html div props
    setting: ExtendedSetting;
    children: React.ReactNode;
}

const SettingFieldContainer = ({ setting, children, className, ...props }: SettingFieldContainerProps) => {
    return (
        <div className="w-full flex flex-col gap-1">
            <div className="w-full flex flex-row gap-2 items-center justify-between">
                <Text className="text-dark" size="large">
                    {getSettingName(setting)}
                </Text>
                {setting.note ? <SettingFieldNote setting={setting} /> : <div />}
            </div>
            <div className={clx("w-full", className)} {...props}>
                {children}
            </div>
            <div className="w-full flex flex-row gap-2 items-center justify-start">
                <Text className="text-grey-50">{setting.description}</Text>
            </div>
        </div>
    )
}

export default SettingFieldContainer;