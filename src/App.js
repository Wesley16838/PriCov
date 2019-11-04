import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link ,Redirect} from "react-router-dom"

//components
import Header from './components/headerComponent/header'
import Footer from './components/footerComponent/footer'
import Landingpage from './components/pages/landingPage'
import Homepage from './components/pages/homePage'

import SigninContainer from './components/pages/signinPage'
import Button from "./components/redux-test/button";

//includes
import './Assets/css/styles.min.css'//css file
import './Assets/js/scripts.min.js'//js file
import { firebase } from "./components/firebase";
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
    console.log('firebase.isAuthenticated(),',firebase.isAuthenticated())
    return(
     
      <Router>
         <div className="App">
          <Header/>
          <Switch>
            <Route exact path="/" component={Landingpage}></Route>
            <Route path="/signin" component={SigninContainer} />
            <PrivateRoute path="/home" component={Homepage} />
          </Switch>
          <Button type="login"/>
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
      console.log('isAuthenticated,',firebase.isAuthenticated());
      console.log('Component,',{...props});
      if(firebase.isAuthenticated()){
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