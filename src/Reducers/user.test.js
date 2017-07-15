/* eslint-env node, mocha */

import fixture from './user';
import chai from 'chai';
import sinon from 'sinon';

import * as Authentication from '../Services/Authentication';

chai.should();

let stub;

describe('User reducer', function() {
  afterEach(() => {
    stub.restore();
  });

  it('CREATE_USER_SUCCESS', function() {
    stub = sinon.stub(Authentication, 'login');

    const user = {
      id: 123,
      username: 'takeru'
    };
    const headers = {
      'access-token': '123abc456def',
      client: 'client 123xyd',
      uid: 'user 12383kdj',
      expiry: 1234567
    };
    const action = {
      user,
      type: 'CREATE_USER_SUCCESS',
      headers
    };
    fixture({}, action).should.deep.equal({
      user
    });
    stub.calledWith(headers).should.be.true;
  });
});
