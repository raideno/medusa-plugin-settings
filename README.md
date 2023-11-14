# Medusa Plugin Settings

![Thumbnail](./assets/plugin-thumbnail.png)

The Medusa Plugin Settings streamlines the addition of new settings with a user interface to your admin dashboard, enhancing customization and efficiency. Tailored for Medusa, it simplifies the integration process, providing a seamless and user-friendly experience for administrators.

## Documentation

See [Documentation](https://medusa-plugin-settings.raideno.xyz).

## Contact

**Discord:** @raideno `ID:423897604330618883`

## Usage

### Installation

```bash
npm i medusa-plugin-settings
```

### Run Migrations

First build your backend.

```bash
npm run build
```

Run the migrations

```bash
npx medusa migrations run
```

### Configuration

This env variables are required on the admin: `BACKEND_URL`

```ts
// medusa-config.js

const plugins = [
  /** @type {import('medusa-plugin-settings').PluginOptions} */
  {
    resolve: "medusa-plugin-settings",
    options: {
      enableUI: true,
      backendUrl: process.env.BACKEND_URL || "http://localhost:9000",
      settings: [
        {
          id: "is-store-working",
          name: "Is Store Enabled",
          type: SettingSchemaTypes.BOOLEAN,
          defaultValue: true,
          // optional
          description:
            "If set to false store-front will no more be accessible.",
          note: "BE CARFUL!",
        },
        // other settings..
      ],
    },
  },
];

// ...
```

### Use Settings

The plugin will make sure at each startup that every setting is initialized with it's default value / previously set value and make them available through endpoints or via the admin UI under the settings tab.

[Image]().

[Video]().

## Documentation

See [Documentation](https://medusa-plugin-settings.raideno.xyz).

## Examples & Use Cases

- [Use Case -1](https://medusa-plugin-settings.raideno.xyz)
- [Use Case -2](https://medusa-plugin-settings.raideno.xyz)
- [Use Case -3](https://medusa-plugin-settings.raideno.xyz)
- [Use Case -4](https://medusa-plugin-settings.raideno.xyz)

## Contribution

Anyone is welcome to contribute or suggest new features, please contact me on **Discord:** @raideno `ID:423897604330618883`.

## Features

- **Effortless UI Integration for Settings:** The Medusa Plugin Settings simplifies the incorporation of new settings into your admin dashboard. Mark your settings with a decorator, and watch as the plugin seamlessly creates a user interface within the Medusa dashboard.

- **Streamlined Configuration Operations:** With the added UI, managing your settings becomes a breeze. Perform essential configuration tasks such as creating new settings, editing existing ones, viewing detailed information, and deleting settings with unparalleled ease.

- **Tailor to Your Needs:** Customize the generated UI according to your specific requirements. The Medusa Plugin Settings provides flexibility in controlling the appearance and behavior of UI elements, ensuring a personalized experience.

- **Endpoint Exposure for Enhanced Interaction:** Beyond dashboard integration, this plugin exposes your settings through a dedicated endpoint. This feature facilitates seamless interaction between your store and the configured settings, offering a programmatic avenue for efficient communication.
