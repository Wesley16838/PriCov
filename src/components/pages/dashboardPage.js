import React, {Component} from 'react';
// import { BrowserRouter as Router, Switch, Route,NavLink } from "react-router-dom"

import Getdashboard from "../charts/Getdashboard"

import {
    withRouter
  } from 'react-router-dom'
class Dashboardpage extends Component {
  constructor(props) {
    console.log('in Dashboard!')
    super(props);
    this.state = {
        email: this.props.email
    }
  }
  componentWillMount(){
        console.log("in homepage componentWillMount!!!")
  }
  componentDidMount(){
    console.log("in homepage componentDidMount!!!")
  }
  render() {
    console.log("in dashboard render!!!")
    return(
   
            <Getdashboard id="someemail@email.com"/>
           

      
      

    )
  }
}

export default withRouter(Dashboardpage);