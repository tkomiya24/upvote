import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.onChange = this.onChange.bind(this);
    this.register = this.register.bind(this);
  }
  render() {
    return (
      <div className="registration">
        <form onSubmit={this.register}>
          <div><label>Username</label><input name="username" type="text" onChange={this.onChange} /></div>
          <div><label>Password</label><input name="password" type="password" onChange={this.onChange} /></div>
          <input type="submit" value="Go go go!" />
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
    alert(`This doesn't work yet, ${this.state.username}`);
  }
}

export default Register;
