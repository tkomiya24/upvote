import React from 'react';
import PropTypes from 'prop-types';

const UpvotesShow = ({upvote}) => {
  return (
    <div>
      <pre>
        {JSON.stringify(upvote, null, 2)}
      </pre>
      <br />
      <hr />
    </div>
  );
};

UpvotesShow.propTypes = {
  upvote: PropTypes.object.isRequired
};

export default UpvotesShow;
