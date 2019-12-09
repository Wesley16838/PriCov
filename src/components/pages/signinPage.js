import React, {Component} from 'react';
import { auth } from "../firebase";

import SignIn from "../component/signin"
import SignUp from "../component/signup"
class signinpage extends Component {
  componentDidMount() {
    document.title = this.props.title
  }
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