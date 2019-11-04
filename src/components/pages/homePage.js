import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route,NavLink } from "react-router-dom"
import SignOutButton from "./signout"
class Homepage extends Component {
  
  render() {
    return(
      <div className="container">
        <SignOutButton/>
      </div>
       
      

    )
  }
}

export default Homepage;