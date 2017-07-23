import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as UserActions from '../../../Actions/user';

import UI from './UI';

class UpvotesIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValues: [],
      subredditFilter: ''
    };
    this.changeFilterValue = this.changeFilterValue.bind(this);
    props.getUpvotes().then();
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
      <UI
        upvotes={upvotes}
        onFilterChange={this.changeFilterValue}
        subredditFilter={this.state.subredditFilter}
        filters={this.state.filterValues} />
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
  getUpvotes: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    upvotes: state.redditData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUpvotes: () => {
      return dispatch(UserActions.getUpvotes());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UpvotesIndex);
