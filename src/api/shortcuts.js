import _ from 'lodash';

export const SCHEMA = 'shoutem.core.shortcuts';

export default class Shortcuts {
  constructor(config) {
    this.config = config;

    this.get = this.get.bind(this);
    this.update = this.update.bind(this);
    this.getSettings = this.getSettings.bind(this);
    this.updateSettings = this.updateSettings.bind(this);
  }

  get(shortcutId = null, config = {}) {
    const resolvedConfig = { ...this.config, ...config };
    const { appId, url, auth } = resolvedConfig;
    const { apps } = url;
    const { token } = auth;
    const resolvedShortcutId = shortcutId || resolvedConfig.shortcutId;

    const endpoint = `${apps}v1/apps/${appId}/shortcuts/${resolvedShortcutId}`;

    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.api+json',
        Authorization: `Bearer ${token}`,
      },
    };

    return fetch(endpoint, options).then(response => (
      response.json().then(payload => {
        const shortcut = payload.data;
        return shortcut;
      })
    ));
  }

  update(patch, shortcutId = null, config = {}) {
    const resolvedConfig = { ...this.config, ...config };
    const { appId, url, auth } = resolvedConfig;
    const { apps } = url;
    const { token } = auth;
    const resolvedShortcutId = shortcutId || resolvedConfig.shortcutId;

    const shortcutPatch = {
      data: {
        type: SCHEMA,
        id: resolvedShortcutId,
        ...patch,
      },
    };

    const endpoint = `${apps}v1/apps/${appId}/shortcuts/${resolvedShortcutId}`;

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

  getSettings(shortcutId = null, config = {}) {
    return this.get(shortcutId, config).then(shortcut => (
      _.get(shortcut, 'attributes.settings')
    ));
  }

  updateSettings(settings, shortcutId = null, config = {}) {
    const patch = {
      attributes: { settings },
    };

    return this.update(patch, shortcutId, config);
  }
}
