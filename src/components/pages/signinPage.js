import React, {Component} from 'react';
import { auth } from "../firebase";

import SignIn from "./signin"
import SignUp from "./signup"
class signinpage extends Component {
  render() {
    return(
      
          <div className="signin-container">
            <section>
              <SignIn/>
              <div className="or">
                <h2>Or</h2>
              </div>
              <SignUp/>
            </section>
          </div>

    )
  }
}

export default signinpage;