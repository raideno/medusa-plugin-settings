export type SettingSchemaOption = {
    id: string;
    value: string;
    label?: string;
    description?: string;
}

export type SettingSchemaOptions = [SettingSchemaOption, ...SettingSchemaOption[]];

export enum SettingSchemaTypes {
    BOOLEAN = "BOOLEAN",
    INTEGER = "INTEGER",
    NUMBER = "NUMBER",
    STRING = "STRING",
    TEXT = "TEXT",
    PASSWORD = "PASSWORD",
    SELECT = "SELECT",
    STRING_ARRAY = "STRING_ARRAY",
}

type SettingSchemaTypeToOptionType = {
    [SettingSchemaTypes.BOOLEAN]: undefined;
    [SettingSchemaTypes.INTEGER]: undefined;
    [SettingSchemaTypes.NUMBER]: undefined;
    [SettingSchemaTypes.STRING]: undefined;
    [SettingSchemaTypes.TEXT]: undefined;
    [SettingSchemaTypes.PASSWORD]: undefined;
    // [SettingSchemaTypes.SELECT]: SettingSchemaOptions | (() => Promise<SettingSchemaOptions> | SettingSchemaOptions);
    [SettingSchemaTypes.SELECT]: SettingSchemaOptions;
    [SettingSchemaTypes.STRING_ARRAY]: undefined;
}

type SettingSchemaTypeToDefaultValueType = {
    [SettingSchemaTypes.BOOLEAN]: boolean;
    [SettingSchemaTypes.INTEGER]: number;
    [SettingSchemaTypes.NUMBER]: number;
    [SettingSchemaTypes.STRING]: string;
    [SettingSchemaTypes.TEXT]: string;
    [SettingSchemaTypes.PASSWORD]: string;
    [SettingSchemaTypes.SELECT]: string;
    [SettingSchemaTypes.STRING_ARRAY]: [];
}

type BaseSettingSchemaWithType<SettingSchemaType extends SettingSchemaTypes> = {
    id: string;
    name: string;
    type: SettingSchemaType;
    defaultValue: SettingSchemaTypeToDefaultValueType[SettingSchemaType];
    /**---important */
    freezed?: boolean;
    confirmation?: boolean;
    notification?: boolean;
    /**---mendatory */
    note?: string;
    description?: string;
    group?: string;
}

type SettingSchemaWithType<SettingSchemaType extends SettingSchemaTypes> = SettingSchemaType extends SettingSchemaTypes.SELECT ?
    BaseSettingSchemaWithType<SettingSchemaType> & {
        options: SettingSchemaTypeToOptionType[SettingSchemaType]
    } : BaseSettingSchemaWithType<SettingSchemaType>

export type SettingSchema =
    SettingSchemaWithType<SettingSchemaTypes.BOOLEAN> |
    SettingSchemaWithType<SettingSchemaTypes.INTEGER> |
    SettingSchemaWithType<SettingSchemaTypes.NUMBER> |
    SettingSchemaWithType<SettingSchemaTypes.STRING> |
    SettingSchemaWithType<SettingSchemaTypes.TEXT> |
    SettingSchemaWithType<SettingSchemaTypes.PASSWORD> |
    SettingSchemaWithType<SettingSchemaTypes.SELECT> |
    SettingSchemaWithType<SettingSchemaTypes.STRING_ARRAY>;