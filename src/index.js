import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import AuthLayout from 'layouts/Auth.jsx';
import RtlLayout from 'layouts/RTL.jsx';
import AdminLayout from 'layouts/Admin.jsx';
import rootReducer from 'reducer';

import 'assets/scss/material-dashboard-pro-react.scss?v=1.7.0';

const hist = createBrowserHistory();

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk]
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/rtl" component={RtlLayout} />
        <Route path="/auth" component={AuthLayout} />
        <Route path="/admin" component={AdminLayout} />
        <Redirect from="/" to="/admin/timeCard" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
