import React from 'react';
import PropTypes from 'prop-types';

import Show from '../Show';

const UpvotesIndexUI = ({filters, onFilterChange, upvotes, subredditFilter}) => {
  return (
    <div className="upvotes">
      <div className="filter-controls">
        <ul>
          {filters.map(filterValue => {
            return (
              <li
                key={filterValue}>
                <button
                  onClick={() => { onFilterChange(filterValue); }}>
                  {filterValue}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="upvotes-container">
        {upvotes.map((upvote, index) => {
          if (subredditFilter &&
              subredditFilter !== upvote.data.subreddit_name_prefixed) {
            return null;
          }
          return (
            <Show key={index} upvote={upvote} />
          );
        })}
      </div>
    </div>
  );
};

UpvotesIndexUI.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  upvotes: PropTypes.arrayOf(PropTypes.object).isRequired,
  subredditFilter: PropTypes.string
};

export default UpvotesIndexUI;
