import _ from 'lodash';
import { fetchResource } from '../resources/Resource';
import shortcutResource, { SHORTCUTS } from '../resources/shortcuts';

export default class Shortcuts {
  constructor(config) {
    this.config = config;

    this.get = this.get.bind(this);
    this.update = this.update.bind(this);
    this.getSettings = this.getSettings.bind(this);
    this.updateSettings = this.updateSettings.bind(this);

    this.resource = shortcutResource(config);
  }

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

  getSettings(config = {}) {
    return this.get(config).then(shortcut => (
      _.get(shortcut, 'attributes.settings')
    ));
  }

  updateSettings(settings, config = {}) {
    const patch = {
      attributes: { settings },
    };

    return this.update(patch, config);
  }
}