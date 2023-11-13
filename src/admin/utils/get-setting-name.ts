import { ExtendedSetting } from "../../types/extended-setting";

export default (setting: ExtendedSetting) => setting.name || setting.id;