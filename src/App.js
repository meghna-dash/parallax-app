import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
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
AWS.config.credentials = Auth.essentialCredentials(Auth.currentCredentials());

Amplify.configure({
  Auth: {
    identityPoolId: 'us-east-1:82bdbe9c-3966-4320-8be5-162f8ea98564', //REQUIRED - Amazon Cognito Identity Pool ID
    region: 'us-east-1', // REQUIRED - Amazon Cognito Region
    userPoolId: 'us-east-1_G46x3gO3N', //OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: '2su7m42u3lmp0sndlkb8u7tb0r', //OPTIONAL - Amazon Cognito Web Client ID
  },
  Storage: {
    AWSS3: {
      bucket: 'parallax-videos', //REQUIRED -  Amazon S3 bucket
      region: 'us-east-1', //OPTIONAL -  Amazon service region
      policy: 'public'
    }
  }
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  // render() {
  //   return (
  //     <Router history={hist}>
  //       <Switch className="mountains">
  //         <Route path="/project" component={props => <AdminLayout {...props} />} />
  //         <Route path="/auth" render={props => <AuthLayout {...props} />} />
  //         <Redirect from="/" to="/project" />
  //       </Switch>
  //     </Router>
  //   )
  // }

  render() {
    if(sessionStorage.getItem("userID") != null && sessionStorage.getItem("userID") != undefined) {
      return (
        <Router history={hist}>
          <Switch className="mountains">
            <Route path="/project" component={props => <AdminLayout {...props} />} />
            <Redirect from="/" to="/project/sessions" />
          </Switch>
        </Router>
      )
    }
    else {
      return (
        <Router history={hist}>
          <Switch>
            <Route path="/auth" render={props => <AuthLayout {...props} />} />
            <Redirect from="/" to="/auth/login" />
          </Switch>
        </Router>
      )
    }
  }
}

export default App;

// export default withAuthenticator(App, { includeGreetings: false});
