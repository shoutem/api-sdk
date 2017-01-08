export default class Api {
  constructor() {
    this.context = {};
    this.init = this.init.bind(this);
    this.getShortcutSettings = this.getShortcutSettings.bind(this);
    this.updateShortcutSettings = this.updateShortcutSettings.bind(this);
  }

  init(config) {
    this.context = {
      ...this.context,
      ...config.context,
    };
  }

  updateShortcutSettings(settings, context = {}) {
    const mergedContext = { ...this.context, ...context };
    const { shortcutId, appId, url, auth } = mergedContext;
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

    const config = {
      method: 'PATCH',
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(shortcutPatch),
    };

    return fetch(endpoint, config);
  }

  getShortcutSettings(context = {}) {
    const mergedContext = { ...this.context, ...context };
    const { shortcutId, appId, url, auth } = mergedContext;
    const { apps } = url;
    const { token } = auth;

    const endpoint = `${apps}v1/apps/${appId}/shortcuts/${shortcutId}`;

    const config = {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.api+json',
        Authorization: `Bearer ${token}`,
      },
    };

    return fetch(endpoint, config).then(response => (
      response.json().then(payload => {
        const shortcut = payload.data;
        const { settings } = shortcut.attributes;
        return settings;
      })
    ));
  }
}
