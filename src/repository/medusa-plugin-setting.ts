import {
    dataSource,
} from "@medusajs/medusa/dist/loaders/database"

import MedusaPluginSetting from "../models/medusa-plugin-setting"

export const MedusaPluginSettingRepository = dataSource
    .getRepository(MedusaPluginSetting);

export default MedusaPluginSettingRepository