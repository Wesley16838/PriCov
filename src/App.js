import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link ,Redirect} from "react-router-dom"

//components
import Header from './components/headerComponent/header'
import Footer from './components/footerComponent/footer'
import Accountpage from './components/pages/accountPage'
import Landingpage from './components/pages/landingPage'
import Homepage from './components/pages/homePage'
import Searchpage from './components/pages/searchPage'
import SigninContainer from './components/pages/signinPage'
import Dashboardpage from './components/pages/dashboardPage'
import ErrorContainer from "./components/pages/ErrorContainer";

//includes
import './Assets/css/styles.min.css'//css file
import './Assets/js/scripts.min.js'//js file
import { firebase } from "./components/firebase";
import { thisExpression } from '@babel/types';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollPixelsY: 0,
      email:null,
      authUser: null,
      loading:true,
      authenticated:false
    };
  }
  //
  componentWillMount() {
    console.log('willmount in app.js')
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          email: user.email,
          authenticated: true,
          currentUser: user.displayName,
          loading: false
        },() => {
          console.log(this.state);
        });
      } else {
        this.setState({
          email:null,
          authenticated: false,
          currentUser: null,
          loading: false
        },() => {
                    console.log(this.state);
          });
      }
    });
  }
  componentDidMount() {
    let body = document.querySelector('body')
    body.addEventListener('scroll', this.handleScroll);
  }; 

  componentWillUnmount() {
    let body = document.querySelector('body')
    body.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll = () => {
    this.setState({
      scrollPixelsY: window.scrollY
    });
    console.log(this.state.scrollPixelsY);
  };
  //
  // componentDidMount() {
   
  //   firebase.auth.onAuthStateChanged(authUser => {
     
 
  //     if (authUser) {
   
  //       // localStorage.setItem('authUser', firebase.isAuthenticated())
       
  //       this.setState(
  //         {
  //           email: authUser.email,
  //           uid: authUser.uid,
  //           name: authUser.displayName,
  //           lastLoginTime: authUser.metadata.lastSignInTime,
  //           fullAuthUser: authUser,
            
  //         },
  //         () => {
  //           console.log(this.state);
  //         }
  //       );
  //     } else {
      
  //       // localStorage.removeItem('authUser')
  //       this.setState(
  //         {
  //           email: null,
  //           uid: null,
  //           name: null,
  //           lastLoginTime: null,
  //           fullAuthUser: null,
   
  //         },
  //         () => {
  //           console.log(this.state);
  //         }
  //       );
  //     }
  //   });
  // }
  render() {
    console.log('app render')
    const { loading } = this.state;

    if (loading) {
      return <div className="loading">
    <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66">
      <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
    </svg>
        </div>
    }
    return(
     
      <Router>
         <div className="App">
          <Header email={this.state.email}/>
          <Switch>
            <Route exact path="/" render={(props) => <Landingpage {...props} email={this.state.email} title="PriCov"/>}/>
            <Route exact path="/signin" render={(props) => <SigninContainer {...props} title="Sign In or Sign Up"/>}/>
            <PrivateRoute exact path="/account" component={Accountpage} email={this.state.email} authenticated={this.state.authenticated} currentUser={this.state.currentUser} title="Your Panels"/>
            <PrivateRoute exact path="/home" component={Homepage} email={this.state.email} authenticated={this.state.authenticated} currentUser={this.state.currentUser} title="Your Panels"/>
            <PrivateRoute exact path="/search" component={Searchpage} email={this.state.email} authenticated={this.state.authenticated} currentUser={this.state.currentUser} title="Search Products"/>
            <PrivateRoute exact path="/dashboard/:keyword" component={Dashboardpage} email={this.state.email} authenticated={this.state.authenticated} currentUser={this.state.currentUser} title="DashBoard"/>
            <Route render={(props) => <ErrorContainer {...props} email={this.state.email} title="Error"/>} />
          </Switch>
          
          <Footer/>
      </div>
      </Router>    
    )
  }
}
const PrivateRoute = ({ component: Component,authenticated,currentUser,email,title, ...rest }) => (
  
  <Route
    {...rest}
    render={props =>{
     
      if( authenticated === true){
        return <Component email = {email} title={title} {...props} {...rest} />
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