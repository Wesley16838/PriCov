import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route,Link } from "react-router-dom"



class Header extends Component {
  render() {
    return(
      <header>
        <div className="logo">
            <h1>PriCov</h1>
        </div>
        <nav>
            <ul>
                <li>
                  <Link className="basicBtn" to="/Signin">
                    Sign In
                  </Link>
                </li>
            </ul>
        </nav>
    </header>
    )
  }
}

export default Header;