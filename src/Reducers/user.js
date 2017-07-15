import * as ActionTypes from '../Actions/ActionTypes';
import * as Authentication from '../Services/Authentication';

export default function(state = {}, action) {
  switch(action.type) {
    case ActionTypes.CREATE_USER_SUCCESS:
      Authentication.login(action.headers);
      return Object.assign({}, state, {user: action.user});
    default:
      return state;
  }
}
