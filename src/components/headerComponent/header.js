import React, {Component} from 'react';




class Header extends Component {
  render() {
    return(
        <header>
        <div className="logo">
        </div>
        <nav>
            <ul>
                <li>
                    <a href="#">Sign in</a>
                </li>
            </ul>
        </nav>
    </header>
    )
  }
}

export default Header;