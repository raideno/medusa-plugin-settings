import { SettingSchema } from "./setting-schema";

export type PluginOptions = {
    /**
     * If set to false, Generated UI on admin dashboard will be disabled.
     * 
     * @prop {boolean} [enableUi=true]
     */
    enableUI?: boolean;
    /**
     * Your medusa backend URL.
     * 
     *  @prop {string}
     */
    backendUrl: string;
    /**
     * Array of settings you need.
     * 
     * @prop {Setting[]}
     */
    settings: SettingSchema[];
    /**
     * Wether to delete additional / unused settings from settings table if found.
     * 
     * @prop {boolean} [shouldDeleteUnusedSettings=false]
     */
    shouldDeleteUnusedSettings?: boolean
    /**
     * Wether to output logging messages on console, set to true by default on dev mode.
     * 
     * @prop {boolean} [loggin=true]
     */
    logging?: boolean;
}