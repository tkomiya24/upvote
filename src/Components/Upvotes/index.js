import React from 'react';
import PropTypes from 'prop-types';
import Show from './Show';

const UpvotesIndex = ({upvotes, subredditFilter}) => {
  upvotes = upvotes || [];
  return (
    <div>
      {upvotes.map((upvote, index) => {
        if (subredditFilter && subredditFilter !== upvote.data.subreddit_name_prefixed) {
          return null;
        }
        return (
          <Show key={index} upvote={upvote} />
        );
      })}
    </div>
  );
};

UpvotesIndex.propTypes = {
  upvotes: PropTypes.arrayOf(PropTypes.object),
  subredditFilter: PropTypes.string
};

export default UpvotesIndex;
