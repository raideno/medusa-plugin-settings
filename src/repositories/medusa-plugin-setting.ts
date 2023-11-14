import {
    dataSource,
} from "@medusajs/medusa/dist/loaders/database"

import { MedusaPluginSetting } from "../models/medusa-plugin-setting"

const MedusaPluginSettingRepository = dataSource.getRepository(MedusaPluginSetting);

export default MedusaPluginSettingRepository