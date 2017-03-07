import { update as rioUpdate, find, remove as rioRemove } from '@shoutem/redux-io';
import api from './..';
import { mergeSettings, getSettings } from '../services/settings';
import resource from '../resources/shortcuts';
import { SCHEMA } from './const';

export function get(config = null, tag = 'current') {
  const resolvedConfig = { ...api.config, ...config };
  const { endpoint, options: requestOptions } = resource(resolvedConfig);

  const options = {
    schema: SCHEMA,
    request: {
      endpoint,
      ...requestOptions,
    },
  };

  return find(options, tag);
}

export function getAll(config = {}, tag = 'all') {
  const resolvedConfig = { ...api.config, ...config };

  const { appId, url, auth } = resolvedConfig;
  const { apps } = url;
  const { token } = auth;

  const endpoint = `${apps}v1/apps/${appId}/shortcuts`;

  const options = {
    schema: SCHEMA,
    request: {
      endpoint,
      headers: {
        Accept: 'application/vnd.api+json',
        Authorization: `Bearer ${token}`,
      },
    },
  };
  return find(options, tag);
}

export function remove(shortcut, config = {}) {
  const resolvedConfig = { ...api.config, ...config };

  const { appId, url, auth } = resolvedConfig;
  const { apps } = url;
  const { token } = auth;

  const endpoint = `${apps}v1/apps/${appId}/shortcuts/${shortcut.id}`;

  const options = {
    schema: SCHEMA,
    request: {
      endpoint,
      headers: {
        Accept: 'application/vnd.api+json',
        Authorization: `Bearer ${token}`,
      },
    },
  };

  return rioRemove(options, shortcut);
}

export function update(patch, config = {}) {
  const resolvedConfig = { ...api.config, ...config };

  const { appId, shortcutId, url, auth } = resolvedConfig;
  const { apps } = url;
  const { token } = auth;

  const endpoint = `${apps}v1/apps/${appId}/shortcuts/${shortcutId}`;

  const options = {
    schema: SCHEMA,
    request: {
      endpoint,
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        Authorization: `Bearer ${token}`,
      },
    },
  };

  const partialShortcut = {
    type: SCHEMA,
    id: shortcutId,
    ...patch,
  };

  return rioUpdate(options, partialShortcut);
}

export function updateSettings(shortcut, settingsPatch) {
  const currentSettings = getSettings(shortcut);
  const newSettings = mergeSettings(currentSettings, settingsPatch);

  const patch = {
    attributes: {
      settings: newSettings,
    },
  };

  return update(patch, shortcut.id);
}
