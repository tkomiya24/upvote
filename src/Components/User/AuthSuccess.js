import React from 'react';
import {Link} from 'react-router';

class AuthSuccess extends React.Component {
  render() {
    return (
      <div>
        You have successfully authorized this app to use your reddit account
      </div>
    );
  }
};

export default AuthSuccess;
