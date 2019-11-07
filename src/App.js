import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link ,Redirect} from "react-router-dom"

//components
import Header from './components/headerComponent/header'
import Footer from './components/footerComponent/footer'
import Landingpage from './components/pages/landingPage'
import Homepage from './components/pages/homePage'
import Searchpage from './components/pages/searchPage'
import SigninContainer from './components/pages/signinPage'

import Singleuser from './components/Apollo-test/singleuser'

//includes
import './Assets/css/styles.min.css'//css file
import './Assets/js/scripts.min.js'//js file
import { firebase } from "./components/firebase";
import firebase_r from "firebase/app";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null
    };
  }
  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      console.log('componentDidMount')
      console.log('authUser,',authUser)
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser))
        this.setState(
          {
            email: authUser.email,
            uid: authUser.uid,
            name: authUser.displayName,
            lastLoginTime: authUser.metadata.lastSignInTime,
            fullAuthUser: authUser
          },
          () => {
            console.log(this.state);
          }
        );
      } else {
        localStorage.removeItem('authUser')
        this.setState(
          {
            email: null,
            uid: null,
            name: null,
            lastLoginTime: null,
            fullAuthUser: null
          },
          () => {
            console.log(this.state);
          }
        );
      }
    });
  }
  render() {
    console.log('render')
   
    return(
     
      <Router>
         <div className="App">
          <Header/>
          <Switch>
            <Route exact path="/" component={Landingpage}></Route>
            <Route path="/signin" component={SigninContainer} />
            <PrivateRoute path="/home" component={Homepage} />
            <PrivateRoute path="/search" component={Searchpage} />
          </Switch>
          <Singleuser id="someemail@email.com"/>
          <Footer/>
      </div>
      </Router>    
    )
  }
}
const PrivateRoute = ({ component: Component, ...rest }) => (
  
  <Route
    {...rest}
    render={props =>{
      console.log('in private')
      console.log('auth,',JSON.parse(localStorage.getItem('authUser')))
      if(JSON.parse(localStorage.getItem('authUser'))){
        return <Component {...props} {...rest} />
      }else{
        return  <Redirect
          to={{
            pathname: "/signin"
          }}
        />
      }
    }
    }
  />
);
export default App;