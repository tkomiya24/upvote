import * as Api from '../Api/user';
import * as ActionTypes from './ActionTypes';

function createUserSuccess(user, headers) {
  return {
    type: ActionTypes.CREATE_USER_SESSION_SUCCESS,
    user,
    headers
  };
};

function createSessionFailed() {
  return {
    type: ActionTypes.CREATE_USER_SESSION_FAILED
  };
}

export function create(user) {
  return function(dispatch) {
    const promise = Api.create(user);
    promise.then(res => {
      dispatch(createUserSuccess(res.body.data, res.headers));
    });
    return promise;
  };
}

export function renewSession(headers) {
  return function(dispatch) {
    const promise = Api.renewSession(headers);
    promise.then(res => {
      dispatch(createUserSuccess(res.body.data, res.headers));
    }).catch(() => {
      dispatch(createSessionFailed());
    });
    return promise;
  };
}
