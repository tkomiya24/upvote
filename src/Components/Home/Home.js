import React from 'react';
import {connect} from 'react-redux';

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <h1>{this.props.user.email}</h1>
        <a href="user/authorize_reddit">
          Authorize your reddit account.
        </a>
      </div>
    );
  }
};

Home.propTypes = {
  user: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.users.user
  };
}

export default connect(mapStateToProps)(Home);
