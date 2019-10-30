import React, {Component} from 'react';

//components
import Header from './components/headerComponent/header'
import Footer from './components/footerComponent/footer'
import Landingpage from './components/pages/landingPage'
import LinkList from './components/Apollo-test/LinkList'
import CreateUser from './components/Apollo-test/CreateUser'


//includes
import './Assets/css/styles.min.css'//css file
import './Assets/js/scripts.min.js'//js file

class App extends Component {
  render() {
    return(
      <div className="App">
        <Header/>
        <Landingpage/>
        {/* <LinkList/> */}
        <CreateUser/>
        <Footer/>
      </div>
    )
  }
}

export default App;