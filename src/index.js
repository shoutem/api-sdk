import * as shortcuts from './shortcuts';
import Api from './Api';

const api = new Api();
export default api;

export const fetchShortcut = (config, tag, ...otherProps) => {
  const resolvedConfig = { ...api.config, ...config };
  return shortcuts.get(api.shortcutResource, resolvedConfig, tag, ...otherProps);
};

export const fetchShortcuts = (config, tag, ...otherProps) => (
  shortcuts.getAll(api.shortcutResource, config, tag, ...otherProps)
);

export const updateShortcut = (config, patch) => {
  const resolvedConfig = { ...api.config, ...config };
  return shortcuts.update(api.shortcutResource, resolvedConfig, patch);
};

export const removeShortcut = (config, shortcut, ...otherProps) => {
  const resolvedConfig = { ...api.config, ...config };
  return shortcuts.remove(api.shortcutResource, resolvedConfig, shortcut, ...otherProps);
};

export const updateShortcutSettings = (config, shortcut, settingsPatch, ...otherProps) => {
  const resolvedConfig = { ...api.config, ...config };
  return shortcuts.updateSettings(
    api.shortcutResource,
    resolvedConfig,
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
export { getShortcuts };

import { SHORTCUTS } from './resources/shortcuts';
export { SHORTCUTS };

import { INSTALLATIONS } from './resources/extensionInstallations';
export { INSTALLATIONS };

import { getExtensionInstallations, getExtensionInstallation } from './extension-installations';
export { getExtensionInstallations, getExtensionInstallation };

import reducers, {
  createScopedReducer,
  getExtensionScope,
  getShortcutScope,
  getCurrentExtension,
  getCurrentShortcut,
} from './redux';
export {
  reducers,
  createScopedReducer,
  getExtensionScope,
  getShortcutScope,
  getCurrentExtension,
  getCurrentShortcut,
};
