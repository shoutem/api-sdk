import _ from 'lodash';
import { fetchResource } from '../resources/Resource';
import extensionResource, { EXTENSIONS } from '../resources/extensions';

export default class Extensions {
  constructor(config) {
    this.config = config;

    this.get = this.get.bind(this);
    this.update = this.update.bind(this);
    this.getSettings = this.getSettings.bind(this);
    this.updateSettings = this.updateSettings.bind(this);

    this.resource = extensionResource(config);
  }

  get(config = {}) {
    const resolvedConfig = { ...this.config, ...config };
    const { extensionId } = resolvedConfig;

    const get = this.resource.get({ extensionId });
    return fetchResource(get)
      .then(response => response.json())
      .then(payload => {
        const extension = payload.data;
        return extension;
      });
  }

  update(patch, config = {}) {
    const resolvedConfig = { ...this.config, ...config };
    const { extensionId } = resolvedConfig;

    const body = {
      data: {
        type: EXTENSIONS,
        id: extensionId,
        ...patch,
      },
    };

    const update = this.resource.update({ extensionId });
    return fetchResource(update, { body: JSON.stringify(body) });
  }

  getSettings(config = {}) {
    return this.get(config).then(extension => (
      _.get(extension, 'attributes.settings')
    ));
  }

  updateSettings(settings, config = {}) {
    const patch = {
      attributes: { settings },
    };

    return this.update(patch, config);
  }
}
