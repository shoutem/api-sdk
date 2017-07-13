export {
  Api,
  Extensions,
  Shortcuts,
} from './api';

export {
  extensions as extensionsResource,
  EXTENSIONS,
  shortcuts as shortcutsResource,
  SHORTCUTS,
  Resource,
  JsonApiResource,
  fetchResource,
} from './resources';

export { initializeFetchTokenInterceptor } from './services/fetchTokenIntercept';
export {
  mergeSettings,
  getSettings,
} from './services/settings';
