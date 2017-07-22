import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as UserActions from '../../Actions/user';
import Upvotes from '../Upvotes';

class Home extends React.Component {
  constructor(props) {
    super(props);
    if (props.user.reddit_username) {
      props.getUpvotes().then();
    }
  }
  render() {
    return (
      <div>
        <h1>{this.props.user.email}</h1>
        {this.props.user.reddit_username
          ? <Upvotes
            upvotes={this.props.redditData} />
          : <a href="user/authorize_reddit">
            Authorize your reddit account.
          </a>}
      </div>
    );
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
