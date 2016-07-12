import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

/* Our apps routes */
import routes from './config/routes';

import reducer from './reducers/reducers.js';
const store = createStore(reducer, applyMiddleware(thunk));

render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);

import { startListeningToAuth } from './actions/actions';
setTimeout(() => {
  store.dispatch(startListeningToAuth());
});