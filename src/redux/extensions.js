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
  RESOLVED_ENDPOINT
} from '@shoutem/redux-io';
import { EXTENSIONS } from '../resources/extensions';
import { mergeSettings, getSettings } from '../services/settings';

export default combineReducers({
  storage: storage(EXTENSIONS),
  all: collection(EXTENSIONS, 'all'),
  current: mapReducers('meta.params.extensionId', one(EXTENSIONS, 'current')),
});

export function getExtensions(state, extensionCollection = null) {
  if (extensionCollection) {
    return getCollection(extensionCollection, state);
  }

  const extensionAllCollection = _.get(state, 'core.extensions.all');
  if (!extensionAllCollection) {
    return null;
  }

  return getCollection(extensionAllCollection, state);
}

export function getExtension(state, extensionId) {
  const currentExtension = _.get(state, ['core', 'extensions', 'current', extensionId]);
  if (!currentExtension) {
    return null;
  }

  return getOne(currentExtension, state);
}

export function fetchOne(resource, extensionId, tag = 'current', params = {}, options = {}) {
  const resolvedParams = {
    extensionId,
    ...params,
  };

  const resolvedOptions = {
    [RESOLVED_ENDPOINT]: true,
    ...options,
  };

  const resourceGet = resource.get({ extensionId });
  return find(resourceGet, tag, resolvedParams, resolvedOptions);
}

export function fetchCollection(resource, tag = 'all', params = {}, options = {}) {
  const resourceGetAll = resource.get();
  return find(resourceGetAll, tag, params, options);
}

export function remove(resource, extension, params = {}, options = {}) {
  const { id: extensionId } = extension;

  const resolvedParams = {
    extensionId,
    ...params,
  };

  const resolvedOptions = {
    [RESOLVED_ENDPOINT]: true,
    ...options,
  };

  const resourceRemove = resource.remove({ extensionId });
  return rioRemove(resourceRemove, extension, resolvedParams, resolvedOptions);
}

export function update(resource, extensionId, patch, params = {}, options = {}) {
  const resolvedParams = {
    extensionId,
    ...params,
  };

  const resolvedOptions = {
    [RESOLVED_ENDPOINT]: true,
    ...options,
  };

  const partialExtension = {
    type: EXTENSIONS,
    id: extensionId,
    ...patch,
  };

  const resourceUpdate = resource.update({ extensionId });
  return rioUpdate(resourceUpdate, partialExtension, resolvedParams, resolvedOptions);
}

export function updateSettings(resource, extension, settingsPatch, ...otherProps) {
  const { id: extensionId } = extension;

  const currentSettings = getSettings(extension);
  const newSettings = mergeSettings(currentSettings, settingsPatch);

  const patch = {
    attributes: {
      settings: newSettings,
    },
  };

  return update(resource, extensionId, patch, ...otherProps);
}
