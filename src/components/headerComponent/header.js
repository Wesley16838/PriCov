import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route,Link } from "react-router-dom"

//test button
import Button from "../redux-test/button"

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      login: true,
      dest: '/Signin',
      out: 'Sign In'
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if(this.state.login){
      this.setState(state => ({
        login: !state.login,
        dest: '/',
        out: 'Sign Out'
      }));
    }
    else{
      this.setState(state => ({
        login: !state.login,
        dest: '/Signin',
        out: 'Sign In'
      }));
    }
    
  }

  render() {
    console.log('location',window.location.pathname)
    return(
      <header>
        <div className="logo">
            <h1>PriCov</h1>
        </div>
        <nav>
            <ul>
                {/* <li>
                  <Link className="basicBtn" to={this.state.dest} onClick={this.handleClick}>{this.state.out}</Link> 
                </li> */}
                <li>
                  <Link className="basicBtn" to={this.state.dest} onClick={this.handleClick}>{this.state.out}</Link> 
                </li>
            </ul>
        </nav>
    </header>
    )
  }
}

export default Header;