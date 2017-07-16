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
    type: ActionTypes.DESTROY_USER_SESSION
  };
}

function getUpvotesSuccess(upvotes) {
  return {
    type: ActionTypes.GET_UPVOTES_SUCCESS,
    upvotes
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

export function login(user) {
  return function(dispatch) {
    const promise = Api.login(user);
    promise.then(res => {
      dispatch(createUserSuccess(res.body.data, res.headers));
    });
    return promise;
  };
}

export function logout() {
  return function(dispatch) {
    const promise = Api.logout();
    promise.then(res => {
      dispatch(createSessionFailed());
    });
    return promise;
  };
}

export function getUpvotes() {
  return function(dispatch) {
    const promise = Api.getUpvotes();
    promise.then(res => {
      dispatch(getUpvotesSuccess(res));
    });
    return promise;
  };
}
