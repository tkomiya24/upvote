import * as Helpers from './helpers';

export function create(user) {
  return Helpers.createPostRequest('auth', user);
};

export function renewSession(headers) {
  return Helpers.createGetRequest('auth/validate_token', headers);
}

export function login(user) {
  return Helpers.createPostRequest('auth/sign_in', user);
}

export function logout() {
  return Helpers.createSignedDeleteRequest('auth/sign_out');
}
