import { combineReducers } from 'redux';

import Api from './Api';
const api = new Api();
export default api;

export const fetchShortcut = (...props) => api.shortcuts.get(...props);
export const fetchShortcuts = (...props) => api.shortcuts.getAll(...props);
export const updateShortcut = (...props) => api.shortcuts.update(...props);
export const removeShortcut = (...props) => api.shortcuts.remove(...props);
export const updateShortcutSettings = (...props) => api.shortcuts.updateSettings(...props);

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

import { getShortcuts, getShortcut } from './shortcuts';
export { getShortcuts, getShortcut };

import { getExtensionInstallations, getExtensionInstallation } from './extension-installations';
export { getExtensionInstallations, getExtensionInstallation };

import reducers from './reducers';
export { reducers };
