import React, { Component } from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import googleLogo from "./../../Assets/img/logo/google.svg"
import {
  withRouter
} from 'react-router-dom'
const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  handleChange = e => {
    let newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  };
  async onSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      console.log('check account');
      await auth.doSignInWithEmailAndPassword(email, password);
      console.log('pass account');
      this.setState({ ...INITIAL_STATE });
      console.log('go to next page');
      this.props.history.push("./home");
    } catch (e) {
      console.log('e,',e);

      switch (e.code) {
        case "auth/user-not-found":
          this.setState({ error: "No Account With That Email Address Found!" });
          break;
        case "auth/wrong-password":
          this.setState({ error: "Password Incorrect!" });
          break;
        case "auth/invalid-email":
          this.setState({ error: "Invalid Email Address!" });
          break;
        default:
          console.log(`Something else went wrong: ${e.code}`);
          this.setState({ error: "Unknown Error!" });
          break;
      }
    }
  }
  async socialSignOn(provider) {
    try {
      await auth.doSocialSignIn(provider);
      this.setState({ ...INITIAL_STATE });
      this.props.history.push("./home");
    } catch (error) {
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // The email of the user's account used.
      //var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      //var credential = error.credential;
      console.log(error);
    }
  }

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "" || password.length < 6;

    return (
      <div className="signin">
                <h2>Sign In</h2>
                <div>
                  {error && <p className="error">{error}</p>}
                  <form onSubmit={this.onSubmit.bind(this)}>
                    
                    <div className="form-group">
                      <label htmlFor="email">Email:</label>
                      <input
                        autoComplete="email"
                        type="email"
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.email}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="password">Password:</label>
                      <input
                        autoComplete="new-password"
                        type="password"
                        name="password"
                        onChange={this.handleChange}
                        value={this.state.password}
                      />
                    </div>
                    <div className="form-group">
                      <button type="submit" className="basicBtn" disabled={isInvalid}>
                        Submit
                      </button>
                    </div>
                  </form>
        

                  <button onClick={() => this.socialSignOn("google")} type="button" className="google-button">
                    <span className="google-button__icon">
                      <img src={googleLogo}/>
                    </span>
                    <span className="google-button__text">Sign in with Google</span>
                  </button>
                </div>
              </div>
    );
  }
}

export default withRouter(SignUp);
