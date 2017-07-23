import React from 'react';
import PropTypes from 'prop-types';
import Show from './Show';

class UpvotesIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValues: [],
      subredditFilter: ''
    };
    this.changeFilterValue = this.changeFilterValue.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.upvotes !== this.props.upvotes) {
      this.setState({
        filterValues: nextProps.upvotes.map(upvote => {
          return upvote.data.subreddit_name_prefixed;
        }).filter((element, index, self) => {
          return index === self.indexOf(element);
        }).sort()
      });
    }
  }
  render() {
    const upvotes = this.props.upvotes || [];
    return (
      <div className="upvotes">
        <div className="filter-controls">
          <ul>
            {this.state.filterValues.map(filterValue => {
              return (
                <li
                  key={filterValue}>
                  <button
                    onClick={() => { this.changeFilterValue(filterValue); }}>
                    {filterValue}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="upvotes-container">
          {upvotes.map((upvote, index) => {
            if (this.state.subredditFilter &&
                this.state.subredditFilter !== upvote.data.subreddit_name_prefixed) {
              return null;
            }
            return (
              <Show key={index} upvote={upvote} />
            );
          })}
        </div>
      </div>
    );
  }
  changeFilterValue(filterValue) {
    this.setState({
      subredditFilter: filterValue
    });
  }
};

UpvotesIndex.propTypes = {
  upvotes: PropTypes.arrayOf(PropTypes.object)
};

export default UpvotesIndex;
