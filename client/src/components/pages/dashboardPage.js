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
        email: this.props.email,
        keyword: this.props.match.params.keyword// url params
    }
    console.log('keyword,',this.state.keyword)
  }
  componentWillMount(){
        console.log("in homepage componentWillMount!!!")
  }
  componentDidMount() {
    document.title = this.props.title
  }
  render() {
    console.log("in dashboard render!!!")
    return(
   
            <Getdashboard id={this.state.email} keyword={this.state.keyword}/>
     
           

      
      

    )
  }
}

export default withRouter(Dashboardpage);