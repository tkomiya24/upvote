import request from 'superagent';

export function createPostRequest(endpoint, payload) {
  request.post(endpoint).send(payload).set('Accept', 'application/json').end(function(err, res) {
    return new Promise((resolve, reject) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
