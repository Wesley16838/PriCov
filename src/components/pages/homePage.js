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
  constructor(props) {
    console.log('in Homepage!')
    
    super(props);
    console.log('email,',this.props.email)
    this.state = {
        email: this.props.email
    }
  }
    componentWillMount(){
        console.log("in homepage componentWillMount!!!")
    }
    componentDidMount() {
      document.title = this.props.title
    }
  render() {
    console.log("in homepage render!!!")
    return(
        <div>
            <div className="home-header">
               
            </div>
            <div className="home-body">
                <h1>Dashboard</h1>
                <CreatePanel/>
                {/* <Getpanel id={this.state.email}/> */}
                <Getpanel id={this.state.email}/>
            </div>
        </div>
      
      

    )
  }
}

export default withRouter(Homepage);