import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as UserActions from '../../Actions/user';
import Upvotes from '../Upvotes';

class Home extends React.Component {
  constructor(props) {
    super(props);
    if (props.user.reddit_username) {
      props.getUpvotes().then(upvotes => {
        this.setState({
          filterValues: upvotes.map(upvote => {
            return upvote.data.subreddit_name_prefixed;
          }).filter((element, index, self) => {
            return index === self.indexOf(element);
          })
        });
      });
    }
    this.state = {
      filterValues: [],
      subredditFilter: ''
    };
    this.changeFilterValue = this.changeFilterValue.bind(this);
  }
  render() {
    return (
      <div className="home">
        <h1>{this.props.user.email}</h1>
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
        {this.props.user.reddit_username
          ? <Upvotes
            subredditFilter={this.state.subredditFilter}
            upvotes={this.props.redditData} />
          : <a href="user/authorize_reddit">
            Authorize your reddit account.
          </a>}
      </div>
    );
  }
  changeFilterValue(filterValue) {
    this.setState({
      subredditFilter: filterValue
    });
  }
};

Home.propTypes = {
  user: PropTypes.object.isRequired,
  getUpvotes: PropTypes.func.isRequired,
  redditData: PropTypes.arrayOf(PropTypes.object)
};

function mapStateToProps(state) {
  return {
    user: state.users.user,
    redditData: state.redditData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUpvotes: () => {
      return dispatch(UserActions.getUpvotes());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
