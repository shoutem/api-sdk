import { update as rioUpdate, find, remove as rioRemove } from '@shoutem/redux-io';
import api from './..';
import { mergeSettings, getSettings } from '../services/settings';
import { SCHEMA } from './const';

export function get(shortcutId = null, tag = 'current', config = null) {
  const resolvedConfig = { ...api.config, ...config };

  const { appId, url, auth } = resolvedConfig;
  const { apps } = url;
  const { token } = auth;
  const resolvedShortcutId = shortcutId || resolvedConfig.shortcutId;

  const endpoint = `${apps}v1/apps/${appId}/shortcuts/${resolvedShortcutId}`;

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

export function getAll(tag = 'all', config = null) {
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

export function remove(shortcut, config = null) {
  const resolvedConfig = { ...api.config, ...config };

  const { appId, url, auth } = resolvedConfig;
  const { apps } = url;
  const { token } = auth;

  const endpoint = `${apps}v1/apps/${appId}/shortcuts/${shortcut.id}`;

  const options = {
    endpoint,
    headers: {
      Accept: 'application/vnd.api+json',
      Authorization: `Bearer ${token}`,
    },
  };

  return rioRemove(options, SCHEMA, shortcut);
}

export function update(patch, shortcutId = null, config = null) {
  const resolvedConfig = { ...api.config, ...config };

  const { appId, url, auth } = resolvedConfig;
  const { apps } = url;
  const { token } = auth;
  const resolvedShortcutId = shortcutId || resolvedConfig.shortcutId;

  const endpoint = `${apps}v1/apps/${appId}/shortcuts/${resolvedShortcutId}`;

  const options = {
    endpoint,
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${token}`,
    },
  };

  const partialShortcut = {
    type: SCHEMA,
    id: resolvedShortcutId,
    ...patch,
  };

  return rioUpdate(options, SCHEMA, partialShortcut);
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
