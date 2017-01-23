export default class Api {
  constructor() {
    this.config = {};
    this.init = this.init.bind(this);
    this.getShortcutSettings = this.getShortcutSettings.bind(this);
    this.updateShortcutSettings = this.updateShortcutSettings.bind(this);
  }

  init(config) {
    this.config = {
      ...this.config,
      ...config,
    };
  }

  updateShortcutSettings(settings, config = {}) {
    const mergedConfig = { ...this.config, ...config };
    const { shortcutId, appId, url, auth } = mergedConfig;
    const { apps } = url;
    const { token } = auth;

    const shortcutPatch = {
      data: {
        type: 'shoutem.core.shortcuts',
        id: shortcutId,
        attributes: { settings },
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

  getShortcutSettings(config = {}) {
    const mergedConfig = { ...this.config, ...config };
    const { shortcutId, appId, url, auth } = mergedConfig;
    const { apps } = url;
    const { token } = auth;

    const endpoint = `${apps}v1/apps/${appId}/shortcuts/${shortcutId}`;

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
        const { settings } = shortcut.attributes;
        return settings;
      })
    ));
  }
}
