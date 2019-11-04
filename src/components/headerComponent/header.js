import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route,Link } from "react-router-dom"



class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      login: 0,
      dest: '/Signin',
      out: 'Sign In'
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if(this.state.login == 0){//default landing page
      this.setState(state => ({//
        login: 1,
        dest: '/',
        out: 'Go Back'
      }));
    }else if(this.state.login == 1){//登入頁面
      this.setState(state => ({
        login: 0,
        dest: '/Signin',
        out: 'Sign In'
      }));
    }else if(this.state.login == -1){//Homepage
      this.setState(state => ({
        login: 0,
        dest: '/Singin',
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