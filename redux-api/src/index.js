import Api from './Api';
const api = new Api();
export default api;

export {
  extensionsResource,
  EXTENSIONS,
  shortcutsResource,
  SHORTCUTS,
  Resource,
  JsonApiResource,
} from '@shoutem/js-api';

import * as shortcuts from './shortcuts';

export const fetchShortcut = (shortcutId, tag, ...otherProps) => (
  shortcuts.fetchOne(api.shortcutsResource, shortcutId, tag, ...otherProps)
);

export const fetchShortcuts = (...props) => (
  shortcuts.fetchCollection(api.shortcutsResource, ...props)
);

export const updateShortcut = (shortcutId, patch, ...otherProps) => (
  shortcuts.update(api.shortcutsResource, shortcutId, patch, ...otherProps)
);

export const removeShortcut = (shortcut, ...otherProps) => (
  shortcuts.remove(api.shortcutsResource, shortcut, ...otherProps)
);

export const updateShortcutSettings = (shortcut, settingsPatch, ...otherProps) => (
  shortcuts.updateSettings(
    api.shortcutsResource,
    shortcut,
    settingsPatch,
    ...otherProps
  )
);

const getShortcuts = shortcuts.getShortcuts;
const getShortcut = shortcuts.getShortcut;
export { getShortcuts, getShortcut };

import * as extensions from './extensions';

export const fetchExtension = (extensionId, tag, ...otherProps) => (
  extensions.fetchOne(api.extensionsResource, extensionId, tag, ...otherProps)
);

export const fetchExtensions = (...props) => (
  extensions.fetchCollection(api.extensionsResource, ...props)
);

export const updateExtension = (extensionId, patch, ...otherProps) => (
  extensions.update(api.extensionsResource, extensionId, patch, ...otherProps)
);

export const removeExtension = (extension, ...otherProps) => (
  extensions.remove(api.extensionsResource, extension, ...otherProps)
);

export const updateExtensionSettings = (extension, settingsPatch, ...otherProps) => (
  extensions.updateSettings(
    api.extensionsResource,
    extension,
    settingsPatch,
    ...otherProps
  )
);

const getExtensions = extensions.getExtensions;
const getExtension = extensions.getExtension;
export { getExtensions, getExtension };

import reducer, {
  createScopedReducer,
  getExtensionState,
  getShortcutState,
  setShortcutScope,
  setExtensionScope,
} from './redux';
export {
  reducer,
  createScopedReducer,
  getExtensionState,
  getShortcutState,
  setShortcutScope,
  setExtensionScope,
};
