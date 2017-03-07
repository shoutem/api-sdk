import _ from 'lodash';
import resource from '../resources/shortcuts';

export const SCHEMA = 'shoutem.core.shortcuts';

export default class Shortcuts {
  constructor(config) {
    this.config = config;

    this.get = this.get.bind(this);
    this.update = this.update.bind(this);
    this.getSettings = this.getSettings.bind(this);
    this.updateSettings = this.updateSettings.bind(this);
  }

  get(config = {}) {
    const resolvedConfig = { ...this.config, ...config };
    const { endpoint, options } = resource(resolvedConfig);

    return fetch(endpoint, options).then(response => (
      response.json().then(payload => {
        const shortcut = payload.data;
        return shortcut;
      })
    ));
  }

  update(patch, config = {}) {
    const resolvedConfig = { ...this.config, ...config };
    const { appId, shortcutId, url, auth } = resolvedConfig;
    const { apps } = url;
    const { token } = auth;

    const shortcutPatch = {
      data: {
        type: SCHEMA,
        id: shortcutId,
        ...patch,
      },
    };

    const endpoint = `${apps}v1/apps/${appId}/shortcuts/${shortcutId}`;

    const options = {
      method: 'PATCH',
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(shortcutPatch),
    };

    return fetch(endpoint, options);
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
