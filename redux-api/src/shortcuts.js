import _ from 'lodash';
import { combineReducers } from 'redux';
import { mapReducers } from '@shoutem/redux-composers';
import {
  storage,
  collection,
  one,
  getCollection,
  getOne,
  update as rioUpdate,
  find,
  remove as rioRemove,
} from '@shoutem/redux-io';
import { SHORTCUTS, mergeSettings, getSettings } from '@shoutem/js-api';

export default combineReducers({
  storage: storage(SHORTCUTS),
  all: collection(SHORTCUTS, 'all'),
  current: mapReducers('meta.params.shortcutId', one(SHORTCUTS, 'current')),
});

export function getShortcuts(state, shortcutCollection = null) {
  if (shortcutCollection) {
    return getCollection(shortcutCollection, state);
  }

  const allShortcutsCollection = _.get(state, 'core.shortcuts.all');
  if (!allShortcutsCollection) {
    return null;
  }

  return getCollection(allShortcutsCollection, state);
}

export function getShortcut(state, shortcutId) {
  const currentShortcut = _.get(state, ['core', 'shortcuts', 'current', shortcutId]);
  if (!currentShortcut) {
    return null;
  }

  return getOne(currentShortcut, state);
}

export function fetchOne(resource, shortcutId, tag = 'current', params = {}, options = {}) {
  const resolvedParams = {
    shortcutId,
    ...params,
  };

  const resourceGet = resource.get({ shortcutId });
  return find(resourceGet, tag, resolvedParams, options);
}

export function fetchCollection(resource, tag = 'all', params = {}, options = {}) {
  const resourceGetAll = resource.get();
  return find(resourceGetAll, tag, params, options);
}

export function remove(resource, shortcut, params = {}, options = {}) {
  const { id: shortcutId } = shortcut;

  const resolvedParams = {
    shortcutId,
    ...params,
  };

  const resourceRemove = resource.remove({ shortcutId });
  return rioRemove(resourceRemove, shortcut, resolvedParams, options);
}

export function update(resource, shortcut, patch, params = {}, options = {}) {
  const { id: shortcutId } = shortcut;

  const resolvedParams = {
    shortcutId,
    ...params,
  };

  const partialShortcut = {
    type: SHORTCUTS,
    id: shortcutId,
    ...patch,
  };

  const resourceUpdate = resource.update({ shortcutId });
  return rioUpdate(resourceUpdate, partialShortcut, resolvedParams, options);
}

export function updateSettings(resource, shortcut, settingsPatch, ...otherProps) {
  const currentSettings = getSettings(shortcut);
  const newSettings = mergeSettings(currentSettings, settingsPatch);

  const patch = {
    attributes: {
      settings: newSettings,
    },
  };

  return update(resource, shortcut, patch, ...otherProps);
}
