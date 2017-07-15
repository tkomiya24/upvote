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

describe('User actions', function() {
  afterEach(() => {
    stub && stub.restore();
  });

  describe('create', function() {
    it('should call create API and dispatch a success with the response', function() {
      const headers = {
        'access-token': '123abc456def',
        client: 'client 123xyd',
        uid: 'user 12383kdj',
        expiry: 1234567
      };
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
      const user = {
        email: 'hi@hello.com',
        password: 'password'
      };
      const store = mockStore();

      return store.dispatch(fixture.create(user)).then(() => {
        store.getActions().should.deep.equal([
          {
            type: 'CREATE_USER_SUCCESS',
            user,
            headers
          }
        ]);
      });
    });
  });
});
