import _ from 'lodash';
import { combineReducers } from 'redux';
import {
  storage,
  collection,
  getCollection,
  getOne,
  update as rioUpdate,
  find,
  remove as rioRemove,
  RESOLVED_ENDPOINT
} from '@shoutem/redux-io';
import { SHORTCUTS } from '../resources/shortcuts';
import { mergeSettings, getSettings } from '../services/settings';

export default combineReducers({
  storage: storage(SHORTCUTS),
  all: collection(SHORTCUTS, 'all'),
});

export function getShortcuts(state, shortcutCollection = null) {
  if (shortcutCollection) {
    return getCollection(shortcutCollection, state);
  }

  const shortcutAllCollection = _.get(state, 'core.shortcuts.all');
  if (!shortcutAllCollection) {
    return null;
  }

  return getCollection(shortcutAllCollection, state);
}

export function get(resource, config, tag = 'current', params = {}, options = {}) {
  const { shortcutId, extensionInstallationId } = config;

  const resolvedParams = {
    extensionInstallationId,
    shortcutId,
    ...params,
  };

  const resolvedOptions = {
    [RESOLVED_ENDPOINT]: true,
    ...options,
  };

  const resourceGet = resource.get({ shortcutId });
  return find(resourceGet, tag, resolvedParams, resolvedOptions);
}

export function getAll(resource, config, tag = 'all', params = {}, options = {}) {
  const { extensionInstallationId } = config;

  const resolvedParams = {
    extensionInstallationId,
    ...params,
  };

  const resolvedOptions = {
    [RESOLVED_ENDPOINT]: true,
    ...options,
  };

  const resourceGetAll = resource.get();
  return find(resourceGetAll, tag, resolvedParams, resolvedOptions);
}

export function remove(resource, config, shortcut, params = {}, options = {}) {
  const { shortcutId, extensionInstallationId } = config;

  const resolvedParams = {
    extensionInstallationId,
    shortcutId,
    ...params,
  };

  const resolvedOptions = {
    [RESOLVED_ENDPOINT]: true,
    ...options,
  };

  const resourceRemove = resource.remove({ shortcutId });
  return rioRemove(resourceRemove, shortcut, resolvedParams, resolvedOptions);
}

export function update(resource, config, patch, params = {}, options = {}) {
  const { shortcutId, extensionInstallationId } = config;

  const resolvedParams = {
    extensionInstallationId,
    shortcutId,
    ...params,
  };

  const resolvedOptions = {
    [RESOLVED_ENDPOINT]: true,
    ...options,
  };

  const partialShortcut = {
    type: SHORTCUTS,
    id: shortcutId,
    ...patch,
  };

  const resourceUpdate = resource.update({ shortcutId });
  return rioUpdate(resourceUpdate, partialShortcut, resolvedParams, resolvedOptions);
}

export function updateSettings(resource, config, shortcut, settingsPatch, ...otherProps) {
  const currentSettings = getSettings(shortcut);
  const newSettings = mergeSettings(currentSettings, settingsPatch);

  const patch = {
    attributes: {
      settings: newSettings,
    },
  };

  return update(resource, config, patch, ...otherProps);
}
