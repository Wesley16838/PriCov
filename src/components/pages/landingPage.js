import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route,NavLink } from "react-router-dom"

import Getstatus from'./../charts/Getstatus'
import Getstatistic from'./../charts/Getstatistic'
class Landingpage extends Component {
  
  render() {
    return(
      <div className="container">

        <div className="landing-header">
          <section>
            <h1>PriCov visualizes price comparison</h1>
            <h2>Users save money &amp; time</h2>
            <div className="landing-header-btn">
              <NavLink className="basicBtn_reverse" to="/signin">
                <h3>Get Started</h3>
              </NavLink>
            </div>
          </section>
          <section></section>
        </div>

        <div className="landing-body">
          <section>
            <div className="landing-body-first-part">
              <h3>
                Data Visualization
              </h3>
              <p>PriCov present  data visualization to improve user experience so users can see visually data.</p>
            </div>
            <div className="landing-body-first-part">
              <h3>
                Real-Time Price
              </h3>
              <p>PriCov immediately searchs the price from popular E-commerce web so users can get real-time data quickly.</p>
            </div>
            <div className="landing-body-first-part">
              <h3>
                Price History Charts
              </h3>
              <p>PriCov tracks prices from popular e-commerce sites so users can view price history for specific products.</p>
            </div>
          </section>

           <Getstatus/>
           <Getstatistic/>
   
          <section>
            
          </section>
        </div>

      </div>
       
      

    )
  }
}

export default Landingpage;