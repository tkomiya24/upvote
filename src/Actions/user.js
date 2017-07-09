import * as Api from '../Api/user';
import * as ActionTypes from './ActionTypes';

function createUserSuccess(user) {
  return {
    type: ActionTypes.CREATE_USER_SUCCESS,
    user
  };
};

export function create(user) {
  return function(dispatch) {
    const promise = Api.create(user);
    promise.then(user => {
      dispatch(createUserSuccess(user));
    });
    return promise;
  };
}
