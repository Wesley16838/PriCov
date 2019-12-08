import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link ,Redirect} from "react-router-dom"

//components
import Header from './components/headerComponent/header'
import Footer from './components/footerComponent/footer'
import Landingpage from './components/pages/landingPage'
import Homepage from './components/pages/homePage'
import Searchpage from './components/pages/searchPage'
import SigninContainer from './components/pages/signinPage'
import Dashboardpage from './components/pages/dashboardPage'


//includes
import './Assets/css/styles.min.css'//css file
import './Assets/js/scripts.min.js'//js file
import { firebase } from "./components/firebase";
import { thisExpression } from '@babel/types';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:null,
      authUser: null,
      loading:true,
      authenticated:false
    };
  }
  //
  componentWillMount() {
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
            <Route exact path="/" component={Landingpage}></Route>
            <Route path="/signin" render={(props) => <SigninContainer {...props} />}/>
            <PrivateRoute path="/home" component={Homepage} email={this.state.email} authenticated={this.state.authenticated} currentUser={this.state.currentUser}/>
            <PrivateRoute path="/search" component={Searchpage} email={this.state.email} authenticated={this.state.authenticated} currentUser={this.state.currentUser}/>
            <PrivateRoute path="/dashboard/:keyword" component={Dashboardpage} email={this.state.email} authenticated={this.state.authenticated} currentUser={this.state.currentUser}/>
          </Switch>
          
          <Footer/>
      </div>
      </Router>    
    )
  }
}
const PrivateRoute = ({ component: Component,authenticated,currentUser,email, ...rest }) => (
  
  <Route
    {...rest}
    render={props =>{
     
      if( authenticated === true){
        return <Component email = {email} {...props} {...rest} />
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