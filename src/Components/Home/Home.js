import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Upvotes from '../Upvotes/Index';

class Home extends React.Component {
  render() {
    return (
      <div className="authenticated-home">
        <h1>{this.props.user.email}</h1>
        {this.props.user.reddit_username
          ? <Upvotes />
          : <a href="user/authorize_reddit">
            Authorize your reddit account.
          </a>}
      </div>
    );
  }
};

Home.propTypes = {
  user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.users.user
  };
}

export default connect(mapStateToProps)(Home);
