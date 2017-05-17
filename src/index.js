import * as shortcuts from './shortcuts';
import Api from './Api';

const api = new Api();
export default api;

export const fetchShortcut = (shortcutId, tag, ...otherProps) => {
  return shortcuts.fetchOne(api.shortcutResource, shortcutId, tag, ...otherProps);
};

export const fetchShortcuts = (...props) => (
  shortcuts.fetchCollection(api.shortcutResource, tag, ...props)
);

export const updateShortcut = (shortcutId, patch, ...otherProps) => {
  return shortcuts.update(api.shortcutResource, shortcutId, patch, ...otherProps);
};

export const removeShortcut = (shortcut, ...otherProps) => {
  return shortcuts.remove(api.shortcutResource, shortcut, ...otherProps);
};

export const updateShortcutSettings = (shortcut, settingsPatch, ...otherProps) => {
  return shortcuts.updateSettings(
    api.shortcutResource,
    shortcut,
    settingsPatch,
    ...otherProps
  );
};

export const fetchExtensionInstallation = (...props) => (
  api.extensionInstallations.get(...props)
);
export const fetchExtensionInstallations = (...props) => (
  api.extensionInstallations.getAll(...props)
);
export const updateExtensionInstallation = (...props) => (
  api.extensionInstallations.update(...props)
);
export const removeExtensionInstallation = (...props) => (
  api.extensionInstallations.remove(...props)
);
export const updateExtensionInstallationSettings = (...props) => (
  api.extensionInstallations.updateSettings(...props)
);

const getShortcuts = shortcuts.getShortcuts;
const getShortcut = shortcuts.getShortcut;
export { getShortcuts, getShortcut };

import { SHORTCUTS } from './resources/shortcuts';
export { SHORTCUTS };

import { INSTALLATIONS } from './resources/extensionInstallations';
export { INSTALLATIONS };

import { getExtensionInstallations, getExtensionInstallation } from './extension-installations';
export { getExtensionInstallations, getExtensionInstallation };

import reducer, {
  createScopedReducer,
  getExtensionState,
  getShortcutState,
  getCurrentExtension,
} from './redux';
export {
  reducer,
  createScopedReducer,
  getExtensionState,
  getShortcutState,
  getCurrentExtension,
};
