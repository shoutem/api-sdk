import _ from 'lodash';
import { mapReducers } from '@shoutem/redux-composers';
import { combineReducers } from 'redux';
import { one, getOne } from '@shoutem/redux-io';
import { reducer as shortcutReducers } from './shortcuts';
import { SHORTCUTS } from './resources/shortcuts';
import { INSTALLATIONS } from './resources/extensionInstallations';
import { reducer as extensionInstallationReducers } from './extension-installations';

const coreReducers = {
  shortcuts: shortcutReducers,
  extensionInstallations: extensionInstallationReducers,
};

export default coreReducers;

export function extensionScopeReducer(reducers) {
  const reducer = combineReducers({
    current: one(INSTALLATIONS, 'current'),
    ...reducers,
  });

  return mapReducers('meta.params.extensionInstallationId', reducer);
}

export function shortcutScopeReducer(reducers) {
  const reducer = combineReducers({
    current: one(SHORTCUTS, 'current'),
    ...reducers,
  });

  return mapReducers('meta.params.shortcutId', reducer);
}

export function createScopedReducer(reducers = {}) {
  const { extension, shortcut, screen } = reducers;

  return extensionScopeReducer({
    ...extension,
    shortcuts: shortcutScopeReducer({
      ...shortcut,
    }),
  });
};

export function getExtensionScope(context, state) {
  const { name, extensionInstallationId } = context;

  return _.get(state, [name, extensionInstallationId]);
}

export function getShortcutScope(context, state) {
  const { shortcutId } = context;

  const extensionState = getExtensionScope(context, state);
  return _.get(extensionState, ['shortcuts', shortcutId]);
}

export function getCurrentExtension(context, state) {
  const extensionState = getExtensionScope(context, state);

  const currentExtension = _.get(extensionState, 'current');
  if (!currentExtension) {
    return null;
  }

  return getOne(currentExtension, state);
}

export function getCurrentShortcut(context, state) {
  const shortcutState = getShortcutScope(context, state);

  const currentShortcut = _.get(shortcutState, 'current');
  if (!currentShortcut) {
    return null;
  }

  return getOne(currentShortcut, state);
}
