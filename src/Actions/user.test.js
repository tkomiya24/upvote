/* eslint-env node, mocha */

import chai from 'chai';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';

import * as Api from '../Api/user';

import * as fixture from './user';

chai.should();

const mockStore = configureMockStore([thunk]);
let stub;
let store;

describe('User actions', function() {
  const headers = {
    'access-token': '123abc456def',
    client: 'client 123xyd',
    uid: 'user 12383kdj',
    expiry: 1234567
  };
  const user = {
    email: 'hi@hello.com',
    password: 'password'
  };

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    stub && stub.restore();
  });

  describe('create', function() {
    it('should call create API and dispatch a success with the response and headers', function() {
      stub = sinon.stub(Api, 'create').callsFake(function(user) {
        return new Promise((resolve, reject) => {
          resolve({
            body: {
              data: user
            },
            headers
          });
        });
      });

      return store.dispatch(fixture.create(user)).then(() => {
        store.getActions().should.deep.equal([
          {
            type: 'CREATE_USER_SESSION_SUCCESS',
            user,
            headers
          }
        ]);
      });
    });
  });

  describe('renewSession', function() {
    it('should call the renew API and dispatch a success action with the user and headers',
      function() {
        stub = sinon.stub(Api, 'renewSession').callsFake(function() {
          return new Promise((resolve, reject) => {
            resolve({
              body: {
                data: user
              },
              headers
            });
          });
        });
        const oldHeaders = {
          'authentication-token': 'xyz193kda=d01o2/'
        };

        return store.dispatch(fixture.renewSession(oldHeaders)).then(() => {
          store.getActions().should.deep.equal([
            {
              type: 'CREATE_USER_SESSION_SUCCESS',
              headers,
              user
            }
          ]);
          stub.calledWith(oldHeaders).should.be.true;
        });
      }
    );

    it('should call the renew API and dispatch a create session failed', function() {
      stub = sinon.stub(Api, 'renewSession').callsFake(function() {
        return new Promise((resolve, reject) => {
          reject(new Error('authentication failed!'));
        });
      });
      const oldHeaders = {
        'authentication-token': 'xyz193kda=d01o2/'
      };

      return store.dispatch(fixture.renewSession(oldHeaders)).then(() => {
        store.getActions().should.deep.equal([
          {
            type: 'CREATE_USER_SESSION_FAILED'
          }
        ]);
        stub.calledWith(oldHeaders).should.be.true;
      }).catch(() => {
        // The action throws.
      });
    });
  });
});
