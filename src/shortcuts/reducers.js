import { combineReducers } from 'redux';
import { storage, collection, one } from '@shoutem/redux-io';
import { SHORTCUTS } from '../resources/shortcuts';

export default combineReducers({
  storage: storage(SHORTCUTS),
  current: one(SHORTCUTS, 'current'),
  all: collection(SHORTCUTS, 'all'),
});
