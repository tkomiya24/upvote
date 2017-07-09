import {combineReducers} from 'redux';

import UsersReducer from './user';

export default combineReducers({
  users: UsersReducer
});
