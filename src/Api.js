import shortcutResource from './resources/shortcuts';
import rio from '@shoutem/redux-io';
import { Actions as ExtensionInstallationActions } from './extension-installations';

export default class Api {
  constructor() {
    this.init = this.init.bind(this);

    this.config = {};
    this.extensionInstallations = null;
  }

  init(config) {
    this.config = {
      ...this.config,
      ...config,
    };

    this.shortcutResource = shortcutResource(this.config);
    const { resourceConfig: shortcutSchemaConfig } = this.shortcutResource;
    rio.registerSchema(shortcutSchemaConfig);

    // this.shortcuts = new ShortcutActions(this.config);
    this.extensionInstallations = new ExtensionInstallationActions(this.config);
  }
}

