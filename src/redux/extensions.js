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
import { EXTENSIONS } from '../resources';
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

  const resourceGet = resource.get({ extensionId });
  return find(resourceGet, tag, resolvedParams, options);
}

export function fetchCollection(resource, tag = 'all', params = {}, options = {}) {
  const resourceGetAll = resource.get();
  return find(resourceGetAll, tag, params, options);
}

export function remove(resource, extension, params = {}, options = {}) {
  const { id: extensionId, canonicalName: extensionName } = extension;

  const resolvedParams = {
    extensionId: extensionName,
    ...params,
  };

  const resourceRemove = resource.remove({ extensionId });
  return rioRemove(resourceRemove, extension, resolvedParams, options);
}

export function update(resource, extension, patch, params = {}, options = {}) {
  const { id: extensionId, canonicalName: extensionName } = extension;

  const resolvedParams = {
    extensionId: extensionName,
    ...params,
  };

  const partialExtension = {
    type: EXTENSIONS,
    id: extensionId,
    ...patch,
  };

  const resourceUpdate = resource.update({ extensionId });
  return rioUpdate(resourceUpdate, partialExtension, resolvedParams, options);
}

export function updateSettings(resource, extension, settingsPatch, ...otherProps) {
  const currentSettings = getSettings(extension);
  const newSettings = mergeSettings(currentSettings, settingsPatch);

  const patch = {
    attributes: {
      settings: newSettings,
    },
  };

  return update(resource, extension, patch, ...otherProps);
}
