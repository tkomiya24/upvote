import Home from './Components/Home';
import Registration from './Components/User/Registration';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'

import style from './css/styles.scss';

ReactDOM.render(
  <BrowserRouter>
    <div className="application-container">
      <Route exact path="/" component={Home} />
      <Route path="/register" component ={Registration} />
    </div>
  </BrowserRouter>,
  document.getElementById('react-root')
);
