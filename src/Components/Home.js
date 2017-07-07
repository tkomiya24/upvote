import React from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
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
};

export default Home;
