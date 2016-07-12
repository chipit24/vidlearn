import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';
import Rebase from 're-base';
let base = Rebase.createClass('https://vidlearn-dev.firebaseio.com/');

/* Import our layout container */
import _MainLayoutContainer from '../layouts/_MainLayoutContainer'

/* All our layouts & components */
import AccountOverview from '../layouts/AccountOverview/_AccountOverview'
import Login from '../components/Login'
import Signup from '../components/Signup'

/* Auth things */
function requireAuth(nextState, replace) {
  let authData = base.getAuth();
  
  if (!authData) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

const routes = (
  <Route path="/" component={_MainLayoutContainer}>
    <IndexRoute component={AccountOverview} onEnter={requireAuth} />
    <Route path="login" component={Login} />
    <Route path="signup" component={Signup} />
  </Route>
);

export default routes;