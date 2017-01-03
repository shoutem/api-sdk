import BuilderSDK from './sdk';
const sdk = new BuilderSDK();

// Export SDK as a property outside of 'default' so it can be used
// as shoutem.sdk and not shoutem.default.sdk
// https://www.npmjs.com/package/babel-plugin-add-module-exports
// https://github.com/webpack/webpack/issues/706
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = sdk;
module.exports = exports.default;
