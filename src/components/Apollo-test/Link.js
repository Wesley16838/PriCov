import React, { Component } from 'react'

class Link extends Component {
  render() {
    //console.log(this.props)
    return (
      <div>
        <div>
          id: {this.props.user._id}
          <br/>
          email: {this.props.user.email}
          <br/>
          [
          {this.props.user.History.map(unit => {
            return(
              <ul>
                <li>history id: {unit._id}</li>
                <li>title {unit.title}</li>
                <li>price: ${unit.price}</li>
                <li>sale: ${unit.sale}</li>
                <li><a href={unit.url} rel="noopener noreferrer" target="_blank">url: {unit.url}</a></li>
                <li>img: {unit.img}</li>
                <li>user: {unit.user}</li>
                <li>keyword: {unit.keyword}</li>
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