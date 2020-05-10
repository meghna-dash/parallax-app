import React, { Component } from "react";
import { createBrowserHistory } from "history";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import AuthLayout from "./layouts/Auth/Auth.jsx";
import AdminLayout from "./layouts/Admin/Admin.jsx";
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);
const hist = createBrowserHistory();

class App extends Component {
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
