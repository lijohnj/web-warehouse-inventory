import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";



class Login extends Component {

    const fakeAuth = {
        isAuthenticated: false,
        authenticate(cb) {
          this.isAuthenticated = true;
          setTimeout(cb, 100); // fake async
        },
        signout(cb) {
          this.isAuthenticated = false;
          setTimeout(cb, 100);
        }
      };

    state = { redirectToReferrer: false };
  
    login = () => {
      fakeAuth.authenticate(() => {
        this.setState({ redirectToReferrer: true });
      });
    };

    
  
    render() {
      let { from } = this.props.location.state || { from: { pathname: "/" } };
      let { redirectToReferrer } = this.state;
  
      if (redirectToReferrer) return <Redirect to={from} />;
  
      return (
        <div>
          <p>You must log in to view the page at {from.pathname}</p>
          <button onClick={this.login}>Log in</button>
        </div>
      );
    }
  }


  export default Login;
  