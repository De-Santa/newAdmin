import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppLayout, AuthLayout } from 'templates';
import { Admin, LogIn, Profile } from 'features';
import { AuthProvider } from 'context';

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <CssBaseline />
      <Switch>
        <Redirect from="/" exact to="/auth/login" />
        <Redirect from="/auth" exact to="/auth/login" />
        <Redirect from="/app" exact to="/app/profile" />
        <Route
          path="/auth"
          render={() => (
            <AuthLayout>
              <Route path="/auth/login" component={LogIn} />
            </AuthLayout>
          )}
        />
        <Route
          path="/app"
          render={() => (
            <AppLayout>
              <Route path="/app/admin" component={Admin} />
              <Route path="/app/profile" component={Profile} />
            </AppLayout>
          )}
        />
      </Switch>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
