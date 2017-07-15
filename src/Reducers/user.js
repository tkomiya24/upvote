import * as ActionTypes from '../Actions/ActionTypes';
import * as Authentication from '../Services/Authentication';

export default function(state = {}, action) {
  switch(action.type) {
    case ActionTypes.CREATE_USER_SESSION_SUCCESS:
      Authentication.login(action.headers);
      return Object.assign({}, state, {user: action.user});
    case ActionTypes.DESTROY_USER_SESSION:
      Authentication.logout();
      return Object.assign({}, state, {user: null});
    default:
      return state;
  }
}
