import ls from 'local-storage';

const ACCESS_TOKEN = 'access-token';
const CLIENT_ID = 'client';
const UID = 'uid';
const EXPIRY = 'expiry';

export function doesSessionExist() {
  return !!ls.get(ACCESS_TOKEN);
}

export function login(headers) {
  ls.set(ACCESS_TOKEN, headers[ACCESS_TOKEN]);
  ls.set(CLIENT_ID, headers[CLIENT_ID]);
  ls.set(UID, headers[UID]);
  ls.set(EXPIRY, headers[EXPIRY]);
}

export function logout() {
  ls.remove(ACCESS_TOKEN);
  ls.remove(CLIENT_ID);
  ls.remove(UID);
  ls.remove(EXPIRY);
}

export function getAuthHeaders() {
  return {
    [ACCESS_TOKEN]: ls.get(ACCESS_TOKEN),
    [CLIENT_ID]: ls.get(CLIENT_ID),
    [UID]: ls.get(UID),
    [EXPIRY]: ls.get(EXPIRY)
  };
}

export function renewCredentials(headers) {
  if (headers[CLIENT_ID] === ls.get(CLIENT_ID)) {
    ls.set(EXPIRY, headers[EXPIRY]);
    ls.set(ACCESS_TOKEN, headers[ACCESS_TOKEN]);
  }
}
