import React, {Component} from 'react';
import { BrowserRouter as Route, Link } from "react-router-dom"
import {
    withRouter
  } from 'react-router-dom'
import plus from "./../../Assets/img/homepage/plus.png"
class createPanel extends Component {

componentWillMount(){
    console.log("in homepage componentWillMount!!!")
}
  componentDidMount(){
    console.log("in homepage componentDidMount!!!")
  }
  render() {
    console.log("in panelpage render!!!")
    return(
        <div className="panel-button">
          <Link className="panelBtn" to='/search'>
          <div>
              <img src={plus}></img>
          </div>
          <div>Create new panel</div>
          <div className="overlay">
                <div className="text">Searching product for more detail</div>
          </div>
          </Link> 
        </div>
      
      

    )
  }
}

export default withRouter(createPanel);