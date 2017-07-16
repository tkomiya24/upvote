import React from 'react';
import PropTypes from 'prop-types';
import Show from './Show';

const UpvotesIndex = ({upvotes}) => {
  upvotes = upvotes || [];
  return (
    <div>
      {upvotes.map((upvote, index) => {
        return (
          <Show key={index} upvote={upvote} />
        );
      })}
    </div>
  );
};

UpvotesIndex.propTypes = {
  upvotes: PropTypes.arrayOf(PropTypes.object)
};

export default UpvotesIndex;
