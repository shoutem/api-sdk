import Shortcuts from './shortcuts';

export default class Api {
  constructor() {
    this.config = {};
    this.init = this.init.bind(this);
    this.shortcuts = null;
  }

  init(config) {
    this.config = {
      ...this.config,
      ...config,
    };

    this.shortcuts = new Shortcuts(this.config);
  }
}
