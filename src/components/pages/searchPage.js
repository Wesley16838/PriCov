import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route,NavLink } from "react-router-dom"
import SignOutButton from "../component/signout"
import {
    withRouter
  } from 'react-router-dom'
class Searchpage extends Component {
    componentWillMount(){
        console.log("in homepage componentWillMount!!!")
    }
  componentDidMount(){
    console.log("in homepage componentDidMount!!!")
  }
  render() {
    console.log("in homepage render!!!")
    return(
        <div className="homepage">
            <div className="home-header">
                <SignOutButton/>
            </div>
            <div className="home-body">
                <h1>SearchPage</h1>
            </div>
        </div>
      
      

    )
  }
}

export default withRouter(Searchpage);