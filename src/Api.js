import { Actions as ShortcutActions } from './shortcuts';
import { Actions as ExtensionInstallationActions } from './extension-installations';

export default class Api {
  constructor() {
    this.init = this.init.bind(this);

    this.config = {};
    this.shortcuts = null;
    this.extensionInstallations = null;
  }

  init(config) {
    this.config = {
      ...this.config,
      ...config,
    };

    this.shortcuts = new ShortcutActions(this.config);
    this.extensionInstallations = new ExtensionInstallationActions(this.config);
  }
}
