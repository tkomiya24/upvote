import * as Helpers from './helpers';

export function create(user) {
  return Helpers.createPostRequest('auth', user);
};
