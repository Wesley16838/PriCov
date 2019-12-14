import React, { Component } from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import googleLogo from "./../../Assets/img/logo/google.svg"
import {
  withRouter
} from 'react-router-dom'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
const POST_MUTATION = gql`
  mutation PostMutation($email: String!) {
    adduser(email: $email) {
      _id
      email
      History{
          title
          price
          sale
          img
          url
      }
    }
  }
`
const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { 
  
      ...INITIAL_STATE 
     };
     console.log('sign in state,',this.state.email)
  }
  handleChange = e => {
    let newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  };
  // firebase.auth.signInWithEmailAndPassword(email, password).then(function(result) {
  //   console.log('result,',result.user.displayName)
  //   // localStorage.setItem('displayName', JSON.stringify(result.user.displayName))
  //   // result.user.tenantId should be ‘TENANT_PROJECT_ID’.
  //   this.setState({ ...INITIAL_STATE });
  //   this.props.history.push("./home");
  // }).catch(function(error) {
  //   // Handle error.
  // });;
  async onSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;

    try {
   
      await auth.doSignInWithEmailAndPassword(email, password);
   
      // this.setState({ ...INITIAL_STATE });
    
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
   
      // let token = await auth.currentUser
      // console.log('token,',token)

      this.setState({ ...INITIAL_STATE },
        console.log(this.state)
        );
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
                      <label for='email' >Email:</label>
                      <input
                        autoComplete="email"
                        type="email"
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.email}
                        id='email'
                      />
                    </div>
                    
                    <div className="form-group">
                      <label for='password' >Password:</label>
                      <input
                        autoComplete="new-password"
                        type="password"
                        name="password"
                        onChange={this.handleChange}
                        value={this.state.password}
                        id='password'
                      />
                    </div>
                    <div className="form-group">
                      <button type="submit" className="basicBtn" disabled={isInvalid}>
                        Submit
                      </button>
                    </div>
                  </form>
        
                  {/* <Mutation mutation={POST_MUTATION}>
                    {(adduser, { data }) => (
                      <div>
                        <form
                          onSubmit={async e => {
                            e.preventDefault();
                            this.socialSignOn("google")
                              .then(function(value){
                                console.log('local itme1,',localStorage.getItem('useremail'))
                                adduser({ variables: { email:localStorage.getItem('useremail') } });
                                console.log('local itme2,',localStorage.getItem('useremail'))
                              }
                            )
                            ;
                          }}
                        >
                        
                        <button type="submit" className="google-button">
                          <span className="google-button__icon">
                            <img src={googleLogo}/>
                          </span>
                          <span className="google-button__text">Sign in with Google</span>
                        </button>
                        </form>
                      </div>
                    )}
                  </Mutation> */}
                </div>
              </div>
    );
  }
}

export default withRouter(SignUp);
