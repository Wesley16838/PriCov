import React, { Component } from 'react'

class Link extends Component {
  render() {
    //console.log(this.props)
    return (
      <div>
        <div>
          {this.props.user._id}
          <br/>
          {this.props.user.email}
          <br/>
          [
          {this.props.user.History.map(unit => {
            return(
              <ul>
                <li>{unit._id}</li>
                <li>{unit.title}</li>
                <li>{unit.price}</li>
                <li>{unit.sale}</li>
                <li>{unit.url}</li>
                <li>{unit.img}</li>
                <li>{unit.user}</li>
              </ul>
            );
            
            
          })}
          ]
        </div>
      </div>
    )
  }
}

export default Link