import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route,NavLink } from "react-router-dom"
import SignOutButton from "../component/signout"
import CreatePanel from "../component/panel"
import PanelList from "../component/panelList"
import Getpanel from "../charts/Getpanel"
import {
    withRouter
  } from 'react-router-dom'
class Homepage extends Component {
    componentWillMount(){
        console.log("in homepage componentWillMount!!!")
    }
  componentDidMount(){
    console.log("in homepage componentDidMount!!!")
  }
  render() {
    console.log("in homepage render!!!")
    return(
        <div>
            <div className="home-header">
                <SignOutButton/>
            </div>
            <div className="home-body">
                <h1>Dashboard</h1>
                <CreatePanel/>
                <Getpanel id="someemail@email.com"/>
            </div>
        </div>
      
      

    )
  }
}

export default withRouter(Homepage);