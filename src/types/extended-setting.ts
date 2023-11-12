import MedusaPluginSetting from "../models/medusa-plugin-setting";
import { SettingSchema } from "./setting-schema";

export type ExtendedSetting = MedusaPluginSetting & SettingSchema;