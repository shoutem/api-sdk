import rio from '@shoutem/redux-io';
import {
  shortcutsResource,
  extensionsResource,
  initializeFetchTokenInterceptor,
} from '@shoutem/js-api';

export default class Api {
  constructor() {
    this.init = this.init.bind(this);

    this.config = {};
  }

  init(config) {
    this.config = {
      ...this.config,
      ...config,
    };

    initializeFetchTokenInterceptor(this.config);

    this.shortcutsResource = shortcutsResource(this.config);
    const { resourceConfig: shortcutSchemaConfig } = this.shortcutResource;
    rio.registerSchema(shortcutSchemaConfig);

    this.extensionsResource = extensionsResource(this.config);
    const { resourceConfig: extensionSchemaConfig } = this.extensionResource;
    rio.registerSchema(extensionSchemaConfig);
  }
}

