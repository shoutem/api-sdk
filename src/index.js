import * as shortcuts from './redux/shortcuts';
import * as extensions from './redux/extensions';
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

const getShortcuts = shortcuts.getShortcuts;
const getShortcut = shortcuts.getShortcut;
export { getShortcuts, getShortcut };

import { SHORTCUTS } from './resources/shortcuts';
export { SHORTCUTS };

export const fetchExtension = (extensionId, tag, ...otherProps) => {
  return extensions.fetchOne(api.extensionResource, extensionId, tag, ...otherProps);
};

export const fetchExtensions = (...props) => (
  extensions.fetchCollection(api.extensionResource, tag, ...props)
);

export const updateExtension = (extensionId, patch, ...otherProps) => {
  return extensions.update(api.extensionResource, extensionId, patch, ...otherProps);
};

export const removeExtension = (extension, ...otherProps) => {
  return extensions.remove(api.extensionResource, extension, ...otherProps);
};

export const updateExtensionSettings = (extension, settingsPatch, ...otherProps) => {
  return extensions.updateSettings(
    api.extensionResource,
    extension,
    settingsPatch,
    ...otherProps
  );
};

import { EXTENSIONS } from './resources/extensions';
export { EXTENSIONS };

const getExtensions = extensions.getExtensions;
const getExtension = extensions.getExtension;
export { getExtensions, getExtension };

import reducer, {
  createScopedReducer,
  getExtensionState,
  getShortcutState,
} from './redux';
export {
  reducer,
  createScopedReducer,
  getExtensionState,
  getShortcutState,
};
