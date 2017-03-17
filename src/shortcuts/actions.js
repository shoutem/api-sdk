import { update as rioUpdate, find, remove as rioRemove } from '@shoutem/redux-io';
import api from './..';
import { mergeSettings, getSettings } from '../services/settings';
import resource, { SCHEMA } from '../resources/shortcuts';

export function get(config = null, tag = 'current') {
  const resolvedConfig = { ...api.config, ...config };
  const shortcuts = resource(resolvedConfig);

  const { shortcutId } = resolvedConfig;
  const options = shortcuts.get({ shortcutId });

  return find(options, tag);
}

export function getAll(config = {}, tag = 'all') {
  const resolvedConfig = { ...api.config, ...config };
  const shortcuts = resource(resolvedConfig);

  const options = shortcuts.get();

  return find(options, tag);
}

export function remove(shortcut, config = {}) {
  const resolvedConfig = { ...api.config, ...config };
  const shortcuts = resource(resolvedConfig);

  const { shortcutId } = resolvedConfig;
  const options = shortcuts.remove({ shortcutId });

  return rioRemove(options, shortcut);
}

export function update(patch, config = {}) {
  const resolvedConfig = { ...api.config, ...config };
  const shortcuts = resource(resolvedConfig);

  const { shortcutId } = resolvedConfig;
  const options = shortcuts.update({ shortcutId });

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
