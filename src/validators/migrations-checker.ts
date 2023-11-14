/**
 * check whether the migrations have been run or not
 */

import { AwilixContainer } from "awilix"

import { ConfigModule } from "@medusajs/medusa"

import { dataSource } from "@medusajs/medusa/dist/loaders/database"
import { PluginOptions } from "../types/plugin-options"

export default async (container: AwilixContainer, configuration: PluginOptions) => {

}