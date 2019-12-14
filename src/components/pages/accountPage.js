import React, {Component} from 'react';
// import { BrowserRouter as Router, Switch, Route,NavLink } from "react-router-dom"
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { auth } from "./../firebase";

import {
    withRouter
  } from 'react-router-dom'

const POST_MUTATION = gql`
  mutation PostMutation($email: String!) {
    deleteuser(email: $email) {
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

class Accountpage extends Component {
  constructor(props) {
    console.log('in Dashboard!')
    super(props);
    this.state = {
        email: this.props.email,
        passwordOld: "",
        passwordNew: "",
        error: null,
        isLoading: false,
        isLoading2 : false,
        password:""
    }
    this.open = this.open.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.remove = this.remove.bind(this)
  }
  open(evt, Name) {

    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them

    tabcontent = document.getElementsByClassName("tabcontent");

    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");

    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    if(document.getElementById(Name)){
      document.getElementById(Name).style.display = "block";
      evt.currentTarget.className += " active";
    }


  
  }
  componentDidMount() {
    document.title = this.props.title
  }
  handleChange = e => {
    if (e.target.name === "passwordNew") {
      if (e.target.value == document.getElementById("passwordOld").value) {
        this.setState({ error: "New Passwords should not same with Old one" });
      } else {
        this.setState({ error: null });
      }
    }
    if (e.target.name === "passwordNew") {
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
  simulateClick(e) {
    console.log('simulateClick')
    if(e){
      e.click()
    }
    
  }
  async remove(e){
    e.preventDefault();
    try{
      console.log('in remove')
      await auth.removeUser(this.state.password)
      console.log('finish remove!!!')
  
    }catch(e){
      console.log('e,',e)
    }
  }
  async onSubmit(e) {
    this.setState({ isLoading: true });
    e.preventDefault();
    const { passwordOld,passwordNew } = this.state;

    try {
      console.log('submit form')
      await auth.doPasswordUpdate(passwordOld,passwordNew);
      console.log('finish submited')
      this.setState({
        isLoading: false})
      this.props.history.push("/home");
    
     
    } catch (e) {
      switch (e.code) {
        case "auth/wrong-password":
          this.setState({ error: "Wrong password!",isLoading: false });
          break;
        default:
          console.log(`Something else went wrong: ${e.code}`);
          this.setState({ error: "Unknown Error!",isLoading: false });
          break;
      }
    }
  }
  render() {
    console.log("in dashboard render!!!")
    const {  passwordOld, passwordNew, password,error } = this.state;
  
    const isInvalid =
    passwordOld == passwordNew ||
    passwordOld === "" ||
    passwordNew === "" ||
    passwordNew.length < 6;

    const isInvalid_next = password === "" 

    return(
      <div className='account'>
         <div className="tab">
          <button className="tablinks" ref={this.simulateClick} onClick={(e)=>this.open(e, 'reset')} id="defaultOpen">Reset password</button>
          <button className="tablinks" onClick={(e)=>this.open(e, 'remove')}>Remove Password</button>
          
          </div>
          
          <div id="reset" className="tabcontent">
          {error && <p className="error">{error}</p>}
            <form onSubmit={this.onSubmit.bind(this)}>
              <label htmlFor="passwordOld">Old password:</label>
              <div className="form-group">
                <input
                  id="passwordOld"
                  autoComplete="new-password"
                  type="password"
                  name="passwordOld"
                  onChange={this.handleChange}
                  value={this.state.passwordOld}
                />
              </div>
              <label htmlFor="passwordNew">New Password</label>
              <div className="form-group">
                <input
                  id="passwordNew"
                  autoComplete="new-password"
                  type="password"
                  name="passwordNew"
                  onChange={this.handleChange}
                  value={this.state.passwordNew}
                />
              </div>
              <div className="form-group">
                
                  {this.state.isLoading ? <button type="submit" disabled>Loading...</button>: <button type="submit" disabled={isInvalid}>Submit</button>}  
               
              </div>
          
            </form> 
            
            
          </div>
          
          <div id="remove" className="tabcontent">
          <form onSubmit={this.remove.bind(this)}> 
          {/* <form> */}
            <label htmlFor="password">Please input password:</label>
              <div className="form-group">
                <input
                  id="password"
                  autoComplete="new-password"
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                  value={this.state.password}
                />
            </div>
            <Mutation mutation={POST_MUTATION} variables={{ email:this.props.email }}>
                      {PostMutation => 
                      <div className="form-group">
                        <button type="submit" disabled={isInvalid_next} onClick={PostMutation}>Remove Account</button>
                      </div>
                      
                      }
            </Mutation>
          </form>
         

            
          </div>
          
      </div>
    )
  }
}

export default withRouter(Accountpage);