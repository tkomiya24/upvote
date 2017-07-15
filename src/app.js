import Home from './Components/Home';
import Registration from './Components/User/Registration';
import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Store from './Store';
import Home2 from './Components/User/Home';

import './css/styles.scss';



ReactDOM.render(
  <Provider store={Store}>
    <BrowserRouter>
      <div className='application-container'>
        <Route exact path='/' component={Home} />
        <Route path='/register' component={Registration} />
        <Route path="/logged_in" component={Home2} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('react-root')
);
