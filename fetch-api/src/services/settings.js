import _ from 'lodash';

function mergeCustomizer(objValue, srcValue) {
  // do not concatenate arrays, just replace them
  if (_.isArray(objValue)) {
    return srcValue;
  }
  // use default merger for other object types
  return undefined;
}

export function mergeSettings(originalSettings, patchSettings) {
  const patchProperties = _.keys(patchSettings);
  const currentSettings = _.pick(originalSettings, patchProperties);
  return _.mergeWith(currentSettings, patchSettings, mergeCustomizer);
}

export function getSettings(originalObject) {
  return _.get(originalObject, 'settings');
}
