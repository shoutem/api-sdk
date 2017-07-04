import { initializeFetchTokenInterceptor } from '../services/fetchTokenIntercept';
import Shortcuts from './Shortcuts';
import Extensions from './Extensions';

export default class Api {
  constructor() {
    this.config = {
      useFetchTokenInterceptor: true,
    };
    this.init = this.init.bind(this);
    this.shortcuts = null;
  }

  init(config) {
    this.config = {
      ...this.config,
      ...config,
    };

    if (this.config.useFetchTokenInterceptor) {
      initializeFetchTokenInterceptor(this.config);
    }

    this.shortcuts = new Shortcuts(this.config);
    this.extensions = new Extensions(this.config);
  }
}
