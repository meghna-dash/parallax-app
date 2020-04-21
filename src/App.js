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



  // componentDidMount() {
  //   console.log('on component mount');
  //   Auth.currentAuthenticatedUser().then(user => {
  //     console.log(user);
  //     this.setState({authState: 'signedIn'});
  //   }).catch(e => {
  //     console.log(e);
  //     this.setState({authState: 'signIn'});
  //   });
  // }



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
    // if(sessionStorage.getItem("userID") != null && sessionStorage.getItem("userID") != undefined) {
      return (
        <Router history={hist}>
          <Switch className="mountains">
            <Route path="/auth" render={props => <AuthLayout {...props} />} />
            <PrivateRoute path="/project" component={props => <AdminLayout {...props} />} />
          </Switch>
        </Router>
      )
    // }
    // else {
    //   return (
    //     <Router history={hist}>
    //       <Switch>
    //         <Redirect from="/" to="/auth/login" />
    //       </Switch>
    //     </Router>
    //   )
    // }
  }
}

export default App;
