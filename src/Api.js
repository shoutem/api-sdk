import { Actions as ShortcutActions } from './shortcuts';

export default class Api {
  constructor() {
    this.init = this.init.bind(this);

    this.config = {};
    this.shortcuts = null;
  }

  init(config) {
    this.config = {
      ...this.config,
      ...config,
    };

    this.shortcuts = new ShortcutActions(this.config);
  }
}
