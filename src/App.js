import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
  withRouter
} from 'react-router-dom';
import AuthLayout from "./layouts/Auth/Auth.jsx";
import AdminLayout from "./layouts/Admin/Admin.jsx";
import LoginPage from "./views/pages/Login.jsx";
import Amplify, { Auth, Storage } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import AWS from 'aws-sdk';
import "./app.css";

Amplify.configure(awsconfig);
const hist = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        sessionStorage.getItem("userID")
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/auth/login',
              state: { from: props.location }
            }} />
      )} />
    )
    return (
      <Router history={hist}>
        <Switch className="mountains">
        <Route path="/auth/sign-up" render={props => <AuthLayout {...props} />} />
          <Route path="/auth/login" render={props => <AuthLayout {...props} />} />
          <PrivateRoute path="/app" component={props => <AdminLayout {...props} />} />
          <Redirect from="/" to="app/projects" />
        </Switch>
      </Router>
    )
  }
}

export default App;
