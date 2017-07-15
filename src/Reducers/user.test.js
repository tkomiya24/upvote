/* eslint-env node, mocha */

import fixture from './user';
import chai from 'chai';
import sinon from 'sinon';

import * as Authentication from '../Services/Authentication';

chai.should();

let stub;

describe('User reducer', function() {
  const user = {
    id: 123,
    username: 'takeru'
  };

  afterEach(() => {
    stub.restore();
  });

  describe('CREATE_USER_SESSION_SUCCESS', function() {
    it('should add the user to the store and store the headers', function() {
      stub = sinon.stub(Authentication, 'login');

      const headers = {
        'access-token': '123abc456def',
        client: 'client 123xyd',
        uid: 'user 12383kdj',
        expiry: 1234567
      };
      const action = {
        user,
        type: 'CREATE_USER_SESSION_SUCCESS',
        headers
      };
      fixture({}, action).should.deep.equal({
        user
      });
      stub.calledWith(headers).should.be.true;
    });
  });

  describe('DESTROY_USER_SESSION', function() {
    it('should remove the headers and the user from the store', function() {
      stub = sinon.stub(Authentication, 'logout');
      const action = {
        type: 'DESTROY_USER_SESSION'
      };
      fixture({user}, action).should.deep.equal({user: null});
      stub.calledOnce.should.be.true;
    });
  });
});
