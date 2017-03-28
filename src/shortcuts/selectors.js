import _ from 'lodash';
import { getCollection, getOne } from '@shoutem/redux-io';

export function getShortcuts(state, collection = null) {
  if (collection) {
    return getCollection(collection, state);
  }

  const shortcutCollection = _.get(state, 'core.shortcuts.all');
  if (!shortcutCollection) {
    return null;
  }

  return getCollection(shortcutCollection, state);
}

export function getShortcut(state, one = null) {
  if (one) {
    return getOne(one, state);
  }

  const shortcutOne = _.get(state, 'core.shortcuts.current');
  if (!shortcutOne) {
    return null;
  }

  return getOne(shortcutOne, state);
}
