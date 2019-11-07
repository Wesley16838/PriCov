import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route,NavLink } from "react-router-dom"
import SignOutButton from "../component/signout"
import CreatePanel from "../component/panel"
import PanelList from "../component/panelList"
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
        <div className="homepage">
            <div className="home-header">
                <SignOutButton/>
            </div>
            <div className="home-body">
                <h1>Dashboard</h1>
                <CreatePanel/>
                <PanelList/>
            </div>
        </div>
      
      

    )
  }
}

export default withRouter(Homepage);