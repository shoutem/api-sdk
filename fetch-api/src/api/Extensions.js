import _ from 'lodash';
import {
  extensions as extensionResource,
  fetchResource,
  EXTENSIONS,
} from '../resources';

/**
 * Extensions expose methods for CRUD operations with ExtensionInstallation resource
 * on Shoutem Api. Upon construction config is passed that configures extension installation
 * resource.
 */
export default class Extensions {
  constructor(config) {
    this.config = config;

    this.get = this.get.bind(this);
    this.update = this.update.bind(this);
    this.getSettings = this.getSettings.bind(this);
    this.updateSettings = this.updateSettings.bind(this);

    this.resource = extensionResource(config);
  }

  /**
   * Method for fetching extension installation
   * @param config - allows overriding and extending base config
   * @returns fetch promise
   */
  get(config = {}) {
    const resolvedConfig = { ...this.config, ...config };
    const { extensionInstallationId: extensionId } = resolvedConfig;

    const get = this.resource.get({ extensionId });
    return fetchResource(get)
      .then(response => response.json())
      .then(payload => {
        const extension = payload.data;
        return extension;
      });
  }

  /**
   * Method for updating extension installation
   * @param patch - patch object of extension installation
   * @param config - allows overriding and extending base config
   * @returns fetch promise
   */
  update(patch, config = {}) {
    const resolvedConfig = { ...this.config, ...config };
    const { extensionInstallationId: extensionId } = resolvedConfig;

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

  /**
   * Method for fetching extension installation settings
   * @param config - allows overriding and extending base config
   * @returns fetch promise
   */
  getSettings(config = {}) {
    return this.get(config).then(extension => (
      _.get(extension, 'attributes.settings')
    ));
  }

  /**
   * Method for updating extension installation settings
   * @param settings - extension installation settings patch
   * @param config - allows overriding and extending base config
   * @returns fetch promise
   */
  updateSettings(settings, config = {}) {
    const patch = {
      attributes: { settings },
    };

    return this.update(patch, config);
  }
}
