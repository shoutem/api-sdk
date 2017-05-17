import _ from 'lodash';
import { mapReducers } from '@shoutem/redux-composers';
import { combineReducers } from 'redux';
import { one, getOne } from '@shoutem/redux-io';
import { reducer as shortcutReducers } from './shortcuts';
import { SHORTCUTS } from './resources/shortcuts';
import { INSTALLATIONS } from './resources/extensionInstallations';
import { reducer as extensionInstallationReducers } from './extension-installations';

const coreReducer = combineReducers({
  shortcuts: shortcutReducers,
  extensionInstallations: extensionInstallationReducers,
});

export default coreReducer;

export function extensionScopeReducer(reducers) {
  if (_.isEmpty(reducers)) {
    return null;
  }

  const reducer = combineReducers({
    current: one(INSTALLATIONS, 'current'),
    ...reducers,
  });

  return mapReducers('meta.params.extensionInstallationId', reducer);
}

export function shortcutScopeReducer(reducers) {
  if (_.isEmpty(reducers)) {
    return null;
  }

  const reducer = combineReducers({
    ...reducers,
  });

  return mapReducers('meta.params.shortcutId', reducer);
}

export function createScopedReducer(reducers = {}) {
  const {
    extension: extensionScopeReducers,
    shortcut:  shortcutScopeReducers,
    screen: screenScopeReducers,
  } = reducers;

  return extensionScopeReducer({
    ...extensionScopeReducers,
    shortcuts: shortcutScopeReducer(shortcutScopeReducers),
  });
};

export function getExtensionState(state, context) {
  const { name, extensionInstallationId } = context;

  return _.get(state, [name, extensionInstallationId]);
}

export function getShortcutState(state, context) {
  const { shortcutId } = context;

  const extensionState = getExtensionScope(context, state);
  return _.get(extensionState, ['shortcuts', shortcutId]);
}

export function getCurrentExtension(state, context) {
  const extensionState = getExtensionScope(context, state);

  const currentExtension = _.get(extensionState, 'current');
  if (!currentExtension) {
    return null;
  }

  return getOne(currentExtension, state);
}

/*
export function getCurrentShortcut(context, state) {
  const shortcutState = getShortcutScope(context, state);

  const currentShortcut = _.get(shortcutState, 'current');
  if (!currentShortcut) {
    return null;
  }

  return getOne(currentShortcut, state);
}
*/
