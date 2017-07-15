import * as Api from '../Api/user';
import * as ActionTypes from './ActionTypes';

function createUserSuccess(user, headers) {
  return {
    type: ActionTypes.CREATE_USER_SUCCESS,
    user,
    headers
  };
};

export function create(user) {
  return function(dispatch) {
    const promise = Api.create(user);
    promise.then(res => {
      dispatch(createUserSuccess(res.body.data, res.headers));
    });
    return promise;
  };
}
