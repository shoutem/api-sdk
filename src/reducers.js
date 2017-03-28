import { combineReducers } from 'redux';
import { reducer as shortcutReducers } from './shortcuts';
import { reducer as extensionInstallationReducers } from './extension-installations';

export default combineReducers({
  shortcuts: shortcutReducers,
  extensionInstallations: extensionInstallationReducers,
});
