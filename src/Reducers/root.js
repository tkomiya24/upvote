import {combineReducers} from 'redux';

import UsersReducer from './user';
import RedditDatumReducer from './RedditDatum';

export default combineReducers({
  users: UsersReducer,
  redditData: RedditDatumReducer
});
