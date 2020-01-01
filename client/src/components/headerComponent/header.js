import React, {Component} from 'react';
import { BrowserRouter as  Route,Link } from "react-router-dom"
import { auth } from "../firebase";
import firebase from "firebase/app";
//test button
import Button from "../redux-test/button"

class Header extends Component {
  constructor(props){
    super(props);
    
    this.state = {
     
    }
    
  }


  render() {
    
 
    return(
      <header>
        <div className="logo">
            <Link to="/home"><h1>PriCov</h1></Link>
        </div>
        <nav>
            <ul>
                <li>
                
                {
                    this.props.email
                    ? <div className="dropdown">
                        <button className="basicBtn">Account &#38; Lists</button>
                        <div className="dropdown-content">
                          <Link  to='/account'>Manage account</Link> 
                          <Link  to='/home'>Your Panels</Link> 
                          <Link  to='/' onClick={auth.doSignOut}>Sign Out</Link> 
                        </div>
                      </div>
                    : <Link className="basicBtn" to='/signin' >Sign In</Link> 
                }
                  
                </li>
                {/* <li>
                  <Button type="login"/>
                </li> */}
            </ul>
        </nav>
    </header>
    )
  }
}

export default Header;