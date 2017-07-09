import * as Helpers from './helpers';

export function create(user) {
  return createPostRequest('auth/sign_up');
};
