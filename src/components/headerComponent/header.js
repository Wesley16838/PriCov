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
                    ? <Link className="basicBtn" to='/' onClick={auth.doSignOut}>Sign Out</Link> 
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