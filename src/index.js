import Api from './Api';
const api = new Api();
export default api;

import {
  EXTENSIONS,
  SHORTCUTS,
  Resource,
  JsonApiResource,
} from './resources';

export {
  EXTENSIONS,
  SHORTCUTS,
  Resource,
  JsonApiResource,
};

import * as shortcuts from './redux/shortcuts';

export const fetchShortcut = (shortcutId, tag, ...otherProps) => (
  shortcuts.fetchOne(api.shortcutResource, shortcutId, tag, ...otherProps)
);

export const fetchShortcuts = (...props) => (
  shortcuts.fetchCollection(api.shortcutResource, ...props)
);

export const updateShortcut = (shortcutId, patch, ...otherProps) => (
  shortcuts.update(api.shortcutResource, shortcutId, patch, ...otherProps)
);

export const removeShortcut = (shortcut, ...otherProps) => (
  shortcuts.remove(api.shortcutResource, shortcut, ...otherProps)
);

export const updateShortcutSettings = (shortcut, settingsPatch, ...otherProps) => (
  shortcuts.updateSettings(
    api.shortcutResource,
    shortcut,
    settingsPatch,
    ...otherProps
  )
);

const getShortcuts = shortcuts.getShortcuts;
const getShortcut = shortcuts.getShortcut;
export { getShortcuts, getShortcut };

import * as extensions from './redux/extensions';

export const fetchExtension = (extensionId, tag, ...otherProps) => (
  extensions.fetchOne(api.extensionResource, extensionId, tag, ...otherProps)
);

export const fetchExtensions = (...props) => (
  extensions.fetchCollection(api.extensionResource, ...props)
);

export const updateExtension = (extensionId, patch, ...otherProps) => (
  extensions.update(api.extensionResource, extensionId, patch, ...otherProps)
);

export const removeExtension = (extension, ...otherProps) => (
  extensions.remove(api.extensionResource, extension, ...otherProps)
);

export const updateExtensionSettings = (extension, settingsPatch, ...otherProps) => (
  extensions.updateSettings(
    api.extensionResource,
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
} from './redux';
export {
  reducer,
  createScopedReducer,
  getExtensionState,
  getShortcutState,
};
