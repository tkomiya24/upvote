import request from 'superagent';
import {getAuthHeaders, renewCredentials} from '../Services/Authentication';

function getAndCheckAuthHeaders() {
  const headers = getAuthHeaders();
  for (const key in headers) {
    if (headers.hasOwnProperty(key) && !headers[key]) {
      return null;
    }
  }
  return headers;
}

export function createPostRequest(endpoint, payload) {
  return new Promise((resolve, reject) => {
    request.post(endpoint).send(payload).set('Accept', 'application/json').end(function(err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

export function createGetRequest(endpoint, params = {}) {
  return new Promise((resolve, reject) => {
    request
      .get(endpoint)
      .set('Accept', 'application/json')
      .query(params)
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
  });
}

export function createSignedDeleteRequest(endpoint) {
  return new Promise((resolve, reject) => {
    request
      .del(endpoint)
      .set(getAndCheckAuthHeaders())
      .end((err, res) => {
        if (err) {
          reject(err.response);
        } else {
          resolve(res);
        }
      });
  });
}

export function createSignedGetRequest(endpoint, params = {}) {
  return new Promise((resolve, reject) => {
    request
      .get(endpoint)
      .set('Accept', 'application/json')
      .set(getAndCheckAuthHeaders())
      .query(params)
      .end((err, res) => {
        if (err) {
          renewCredentials(err.response.header);
          reject(err.response);
        } else {
          renewCredentials(res.header);
          resolve(res.body);
        }
      });
  });
}

export function createSignedPostRequest(endpoint, payload) {
  return new Promise((resolve, reject) => {
    request
      .post(endpoint)
      .send(payload)
      .set(getAndCheckAuthHeaders())
      .type('application/json')
      .end((err, res) => {
        if (err) {
          renewCredentials(err.response.header);
          reject(err.response);
        } else {
          renewCredentials(res.header);
          resolve(res.body);
        }
      });
  });
}
