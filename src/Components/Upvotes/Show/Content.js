import React from 'react';
import PropTypes from 'prop-types';

const UpvotesContent = ({data}) => {
  return (
    <div className="content">
      {data.media && data.media.oembed &&
        <div
          className="media"
          dangerouslySetInnerHTML={{
            __html: data.media.oembed.html.replace('&gt;', '>').replace('&lt;', '<')
          }} />
      }
      {
        data.selftext &&
        <p>{data.selftext}</p>
      }
    </div>
  );
};

UpvotesContent.propTypes = {
  data: PropTypes.object.isRequired
};

export default UpvotesContent;
