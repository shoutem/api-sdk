import rio from '@shoutem/redux-io';
import {
  shortcutsResource,
  extensionsResource,
  initializeFetchTokenInterceptor,
} from '@shoutem/api-sdk';

export default class Api {
  constructor() {
    this.init = this.init.bind(this);

    this.config = {
      useFetchTokenInterceptor: true,
    };
  }

  init(config) {
    this.config = {
      ...this.config,
      ...config,
    };

    if (this.config.useFetchTokenInterceptor) {
      initializeFetchTokenInterceptor(this.config);
    }

    this.shortcutsResource = shortcutsResource(this.config);
    const { resourceConfig: shortcutsSchemaConfig } = this.shortcutsResource;
    rio.registerSchema(shortcutsSchemaConfig);

    this.extensionsResource = extensionsResource(this.config);
    const { resourceConfig: extensionsSchemaConfig } = this.extensionsResource;
    rio.registerSchema(extensionsSchemaConfig);
  }
}

