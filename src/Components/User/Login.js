import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as UserActions from '../../Actions/user';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password_confirmation: ''
    };
    this.onChange = this.onChange.bind(this);
    this.login = this.login.bind(this);
  }
  render() {
    return (
      <div className="registration">
        <form onSubmit={this.login}>
          <div>
            <label>Email</label>
            <input name="email" type="text" onChange={this.onChange} />
          </div>
          <div>
            <label>Password</label>
            <input name="password" type="password" onChange={this.onChange} />
          </div>
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  login(event) {
    event.preventDefault();
    this.props.login({
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    }).then(user => {
      this.setState({
        message: 'Success!!!'
      });
      this.props.history.push('/');
    }).catch((err) => {
      this.setState({
        message: 'Failed!! :('
      });
      throw err;
    });
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    login: user => {
      return dispatch(UserActions.login(user));
    }
  };
}

export default connect(null, mapDispatchToProps)(Login);
