import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

//components
import Header from './components/headerComponent/header'
import Footer from './components/footerComponent/footer'
import Landingpage from './components/pages/landingPage'
import SigninContainer from './components/pages/signinPage'

//includes
import './Assets/css/styles.min.css'//css file
import './Assets/js/scripts.min.js'//js file

class App extends Component {
  render() {
    return(
      <Router>
         <div className="App">
          <Header/>
          <Switch>
            <Route exact path="/" component={Landingpage}></Route>
            <Route path="/signin/" component={SigninContainer} />
          </Switch>
          <Footer/>
      </div>
      </Router>    
    )
  }
}

export default App;