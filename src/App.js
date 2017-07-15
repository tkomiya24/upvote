import React from 'react';
import {connect} from 'react-redux';
import {Route, BrowserRouter} from 'react-router-dom';

import * as UserActions from './Actions/user';
import {doesSessionExist} from './Services/Authentication';

import Home from './Components/Home';
import Registration from './Components/User/Registration';
import Login from './Components/User/Login';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renewingSession: false
    };
    this.handleRenewSession = this.handleRenewSession.bind(this);
    if (doesSessionExist() && !props.user) {
      this.state.renewingSession = true;
      props.renewSession().then(this.handleRenewSession).catch(this.handleRenewSession);
    }
  }
  render() {
    return (
      <BrowserRouter>
        {this.state.renewingSession ? (
          <div>
            Please wait...
          </div>
        ) : (
          <div className="application-container">
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Registration} />
          </div>
        )
        }
      </BrowserRouter>
    );
  }
  handleRenewSession() {
    this.setState({
      renewingSession: false
    });
  }
};

App.propTypes = {
  renewSession: React.PropTypes.func.isRequired,
  user: React.PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.users.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    renewSession: () => {
      return dispatch(UserActions.renewSession());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
