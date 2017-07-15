import React from 'react';
import {connect} from 'react-redux';
import * as UserActions from '../../Actions/user';

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password_confirmation: ''
    };
    this.onChange = this.onChange.bind(this);
    this.register = this.register.bind(this);
  }
  render() {
    return (
      <div className="registration">
        <form onSubmit={this.register}>
          <div>
            <label>Username</label>
            <input name="email" type="text" onChange={this.onChange} />
          </div>
          <div>
            <label>Password</label>
            <input name="password" type="password" onChange={this.onChange} />
          </div>
          <div>
            <label>Password confirmation</label>
            <input name="password_confirmation" type="password" onChange={this.onChange} />
          </div>
          <input type="submit" value="Register" />
        </form>
      </div>
    );
  }
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  register(event) {
    event.preventDefault();
    this.props.register({
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

Registration.propTypes = {
  register: React.PropTypes.func.isRequired,
  history: React.PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    register: user => {
      return dispatch(UserActions.create(user));
    }
  };
}

export default connect(null, mapDispatchToProps)(Registration);
