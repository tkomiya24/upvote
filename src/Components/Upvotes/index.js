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
        })
      });
    }
  }
  render() {
    const upvotes = this.props.upvotes || [];
    return (
      <div>
        <div className="filter-controls">
          {this.state.filterValues.map(filterValue => {
            return (
              <button
                key={filterValue}
                onClick={() => { this.changeFilterValue(filterValue); }}>
                {filterValue}
              </button>
            );
          })}
        </div>
        {upvotes.map((upvote, index) => {
          if (this.props.subredditFilter &&
              this.props.subredditFilter !== upvote.data.subreddit_name_prefixed) {
            return null;
          }
          return (
            <Show key={index} upvote={upvote} />
          );
        })}
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
  upvotes: PropTypes.arrayOf(PropTypes.object),
  subredditFilter: PropTypes.string
};

export default UpvotesIndex;
