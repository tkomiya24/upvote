import * as ActionTypes from '../Actions/ActionTypes';

export default function(state = [], action) {
  switch(action.type) {
    case ActionTypes.GET_UPVOTES_SUCCESS:
      return action.upvotes;
    default:
      return state;
  }
}
