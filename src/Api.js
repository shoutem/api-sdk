import rio from '@shoutem/redux-io';
import shortcutResource from './resources/shortcuts';
import extensionResource from './resources/extensions';

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

    this.shortcutResource = shortcutResource(this.config);
    const { resourceConfig: shortcutSchemaConfig } = this.shortcutResource;
    rio.registerSchema(shortcutSchemaConfig);

    this.extensionResource = extensionResource(this.config);
    const { resourceConfig: extensionSchemaConfig } = this.extensionResource;
    rio.registerSchema(extensionSchemaConfig);
  }
}

