import BuilderSDK from './sdk';
const sdk = new BuilderSDK();

// https://www.npmjs.com/package/babel-plugin-add-module-exports
// https://github.com/webpack/webpack/issues/706
'use strict';
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sdk;
module.exports = exports['default'];
