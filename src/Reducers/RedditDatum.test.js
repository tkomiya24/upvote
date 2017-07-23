/* eslint-env node, mocha */
import fixture from './RedditDatum';
import chai from 'chai';

chai.should();

describe('User reducer', function() {
  const upvotes = [
    {
      id: 123,
      data: {
        foo: 'bar'
      }
    },
    {
      id: 456,
      data: 'field'
    }
  ];

  describe('GET_UPVOTES_SUCCESS', function() {
    it('should add the upvotes', function() {
      const action = {
        type: 'GET_UPVOTES_SUCCESS',
        upvotes
      };
      fixture({}, action).should.deep.equal(upvotes);
    });
  });
});
