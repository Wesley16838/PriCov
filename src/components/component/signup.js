import React, { Component } from "react";
import { auth } from "../firebase";

import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import {
    withRouter
  } from 'react-router-dom'
//user schema / all string / history = array
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
  displayName: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  handleChange = e => {
    if (e.target.name === "passwordTwo") {
      if (e.target.value !== document.getElementById("passwordOne").value) {
        this.setState({ error: "Passwords not the same" });
      } else {
        this.setState({ error: null });
      }
    }
    if (e.target.name === "passwordOne") {
      if (e.target.value.length < 6) {
        this.setState({ error: "Passwords at least more than 6 charactors!" });
      } else {
        this.setState({ error: null });
      }
    }
    let newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  };
  async onSubmit(e) {
    e.preventDefault();
    const { displayName, email, passwordOne } = this.state;

    try {
      console.log('submit form')
      await auth.doCreateUserWithEmailAndPassword(
        email,
        passwordOne,
        displayName
      );
      console.log('finish submited ')
      this.setState({ ...INITIAL_STATE });
   
      this.props.history.push("/home");
     
    } catch (e) {
      console.log(e.code);
      switch (e.code) {
        case "auth/invalid-email":
          this.setState({ error: "Invalid Email Address!" });
          break;
        case "auth/weak-password":
          this.setState({
            error: "Password Blank or Password Less Than 6 Characters!"
          });
          break;
        case "auth/email-already-in-use":
          this.setState({ error: "Email Address Already in Use!" });
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
      this.props.history.push("/home");
    } catch (error) {
      
      console.log(error);
    }
  }

  render() {
    const {  displayName, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      passwordTwo === "" ||
      email === "" ||
      displayName === "" ||
      passwordOne.length < 6;

    return (
        <div className="signup">
        <h2>Sign Up</h2>
        <div>
          {error && <p className="error">{error}</p>}
          <form onSubmit={this.onSubmit.bind(this)}>
          
            <div className="form-group">
            <label htmlFor="displayName">Name:</label>
                <input
                type="text"
                name="displayName"
                onChange={this.handleChange}
                value={this.state.displayName}
                />
            </div>
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
              <label htmlFor="passwordOne">Password:</label>
              <input
                id="passwordOne"
                autoComplete="new-password"
                type="password"
                name="passwordOne"
                onChange={this.handleChange}
                value={this.state.passwordOne}
              />
            </div>

            
            <div className="form-group">
              <label htmlFor="passwordTwo">Confirm Password:</label>
              <input
                id="passwordTwo"
                autoComplete="new-password"
                type="password"
                name="passwordTwo"
                onChange={this.handleChange}
                value={this.state.passwordTwo}
              />
            </div>
           
            {/* onCompleted={(data) => alert(data)} */}
              <Mutation mutation={POST_MUTATION} variables={{ email:email }}>
                    {PostMutation => 
                     <div className="form-group">
                        <button onClick={PostMutation} type="submit" className="basicBtn" disabled={isInvalid}>Submit</button>
                     </div>
                    
                    }
              </Mutation>
         
          </form>
          
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);
