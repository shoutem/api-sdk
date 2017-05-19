import _ from 'lodash';
import { fetchResource } from '../resources/Resource';
import shortcutResource, { SHORTCUTS } from '../resources/shortcuts';

/**
 * Shortcut expose methods for CRUD operations with Shortcut resource
 * on Shoutem Api. Upon construction config is passed that configures shortcut
 * resource.
 */
export default class Shortcuts {
  constructor(config) {
    this.config = config;

    this.get = this.get.bind(this);
    this.update = this.update.bind(this);
    this.getSettings = this.getSettings.bind(this);
    this.updateSettings = this.updateSettings.bind(this);

    this.resource = shortcutResource(config);
  }

  /**
   * Method for fetching shortcut
   * @param config - allows overriding and extending base config
   * @returns fetch promise
   */
  get(config = {}) {
    const resolvedConfig = { ...this.config, ...config };
    const { shortcutId } = resolvedConfig;

    const get = this.resource.get({ shortcutId });
    return fetchResource(get)
      .then(response => response.json())
      .then(payload => {
        const shortcut = payload.data;
        return shortcut;
      });
  }

  /**
   * Method for updating shortcut
   * @param patch - patch object of shortcut
   * @param config - allows overriding and extending base config
   * @returns fetch promise
   */
  update(patch, config = {}) {
    const resolvedConfig = { ...this.config, ...config };
    const { shortcutId } = resolvedConfig;

    const body = {
      data: {
        type: SHORTCUTS,
        id: shortcutId,
        ...patch,
      },
    };

    const update = this.resource.update({ shortcutId });
    return fetchResource(update, { body: JSON.stringify(body) });
  }

  /**
   * Method for fetching shortcut settings
   * @param config - allows overriding and extending base config
   * @returns fetch promise
   */
  getSettings(config = {}) {
    return this.get(config).then(shortcut => (
      _.get(shortcut, 'attributes.settings')
    ));
  }

  /**
   * Method for updating shortcut settings
   * @param settings - shortcut settings patch
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
