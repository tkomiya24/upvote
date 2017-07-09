import fixture from './user';
import chai from 'chai';

chai.should();

describe('User reducer', function() {
  it('CREATE_USER_SUCCESS', function() {
    const user = {
      id: 123,
      username: 'takeru'
    };
    const action = {
      user,
      type: 'CREATE_USER_SUCCESS'
    };
    fixture({}, action).should.deep.equal({
      user
    });
  });
});
