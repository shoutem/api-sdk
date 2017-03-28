import { combineReducers } from 'redux';
import { storage, collection, one } from '@shoutem/redux-io';
import { INSTALLATIONS } from '../resources/extensionInstallations';

export default combineReducers({
  storage: storage(INSTALLATIONS),
  current: one(INSTALLATIONS, 'current'),
  all: collection(INSTALLATIONS, 'all'),
});
