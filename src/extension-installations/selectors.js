import _ from 'lodash';
import { getCollection, getOne } from '@shoutem/redux-io';

export function getExtensionInstallations(state, collection = null) {
  if (collection) {
    return getCollection(collection, state);
  }

  const extensionInstallationsCollection = _.get(state, 'core.extensionInstallations.all');
  if (!extensionInstallationsCollection) {
    return null;
  }

  return getCollection(extensionInstallationsCollection, state);
}

export function getExtensionInstallation(state, one = null) {
  if (one) {
    return getOne(one, state);
  }

  const extensionInstallationsOne = _.get(state, 'core.extensionInstallations.current');
  if (!extensionInstallationsOne) {
    return null;
  }

  return getOne(extensionInstallationsOne, state);
}
