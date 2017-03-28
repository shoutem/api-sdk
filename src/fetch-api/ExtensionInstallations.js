import _ from 'lodash';
import { fetchResource } from '../resources/Resource';
import extensionInstallationResource, { INSTALLATIONS } from '../resources/extensionInstallations';

export default class ExtensionInstallations {
  constructor(config) {
    this.config = config;

    this.get = this.get.bind(this);
    this.update = this.update.bind(this);
    this.getSettings = this.getSettings.bind(this);
    this.updateSettings = this.updateSettings.bind(this);

    this.resource = extensionInstallationResource(config);
  }

  get(config = {}) {
    const resolvedConfig = { ...this.config, ...config };
    const { extensionInstallationId } = resolvedConfig;

    const get = this.resource.get({ extensionInstallationId });
    return fetchResource(get)
      .then(response => response.json())
      .then(payload => {
        const extensionInstallation = payload.data;
        return extensionInstallation;
      });
  }

  update(patch, config = {}) {
    const resolvedConfig = { ...this.config, ...config };
    const { extensionInstallationId } = resolvedConfig;

    const body = {
      data: {
        type: INSTALLATIONS,
        id: extensionInstallationId,
        ...patch,
      },
    };

    const update = this.resource.update({ extensionInstallationId });
    return fetchResource(update, { body: JSON.stringify(body) });
  }

  getSettings(config = {}) {
    return this.get(config).then(extensionInstallation => (
      _.get(extensionInstallation, 'attributes.settings')
    ));
  }

  updateSettings(settings, config = {}) {
    const patch = {
      attributes: { settings },
    };

    return this.update(patch, config);
  }
}
