import request from 'superagent';

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
