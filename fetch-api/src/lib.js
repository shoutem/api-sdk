require('es6-promise').polyfill();
import 'fetch-everywhere';
import { Api } from './api';

const api = new Api();

// Export SDK as a property outside of 'default' so it can be used
// as shoutem.sdk and not shoutem.default.sdk
// https://www.npmjs.com/package/babel-plugin-add-module-exports
// https://github.com/webpack/webpack/issues/706
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = api;
module.exports = exports.default;
