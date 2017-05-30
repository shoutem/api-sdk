import _ from 'lodash';
import { mapReducers } from '@shoutem/redux-composers';
import { combineReducers } from 'redux';
import { isFSA } from 'flux-standard-action';
import shortcutsReducer from './shortcuts';
import extensionsReducer from './extensions';

const coreReducer = combineReducers({
  shortcuts: shortcutsReducer,
  extensions: extensionsReducer,
});

export default coreReducer;

export function extensionScopeReducer(reducers) {
  if (_.isEmpty(reducers)) {
    return null;
  }

  const reducer = combineReducers({
    ...reducers,
  });

  return reducer;
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
    shortcut: shortcutScopeReducers,
    // eslint-disable-next-line no-unused-vars
    screen: screenScopeReducers,
  } = reducers;

  return extensionScopeReducer({
    ...extensionScopeReducers,
    shortcuts: shortcutScopeReducer(shortcutScopeReducers),
  });
}

export function getExtensionState(state, extensionName) {
  return _.get(state, [extensionName]);
}

export function getShortcutState(state, extensionName, shortcutId) {
  const extensionState = getExtensionState(state, extensionName);
  return _.get(extensionState, ['shortcuts', shortcutId]);
}

export function setShortcutScope(action, shortcutId) {
  if (!isFSA(action)) {
    console.warn('Cannot apply shortcut scope to action', action);
    return action;
  }

  _.set(action, ['meta', 'params', 'shortcutId'], shortcutId);
  return action;
}

export function setExtensionScope(action, extensionId) {
  if (!isFSA(action)) {
    console.warn('Cannot apply extension scope to action', action);
    return action;
  }

  _.set(action, ['meta', 'params', 'extensionId'], extensionId);
  return action;
}
