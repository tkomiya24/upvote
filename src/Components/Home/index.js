import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Home2 from './Home';

class Home extends React.Component {
  render() {
    if (this.props.user) {
      return <Home2 />;
    } else {
      return (
        <div className="home">
          <div className="header">
            <h1>Upvote</h1>
            <p>
              A better way to view your Reddit history
            </p>
            <Link to="/register">
              Register
            </Link>
          </div>
        </div>
      );
    }
  }
};

Home.propTypes = {
  user: PropTypes.object
};

export default connect(state => {
  return {
    user: state.users.user
  };
})(Home);
