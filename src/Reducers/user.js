import * as ActionTypes from '../Actions/ActionTypes';

export default function(state = {}, action) {
  switch(action.type) {
    case ActionTypes.CREATE_USER_SUCCESS:
      return Object.assign({}, state, {user: action.user});
    default:
      return state;
  }
}
