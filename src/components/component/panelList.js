import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route,NavLink, Link } from "react-router-dom"
import {
    withRouter
  } from 'react-router-dom'
import data from './../../Assets/data/history.json'
class PanelList extends Component {
constructor(){
    super();
    this.state={
        data:data
    }
}
componentWillMount(){
   
}
  componentDidMount(){
    
  }
  render() {
    let body = null;
    let li = null;
    let section = null;
    console.log("in panellist render!!!")
    section = this.state.data && this.state.data.map(next => {
        console.log('check1')
        console.log('next,',next)
        li = next.result.slice(0,3).map(item=>{
            console.log('item,',item)
            return (
            <li key={item.title}>
             {item.title}
            </li>
            )
        
        }
       
            );
        return (
            
            <section key={next.productName}>
            <h3>{next.productName}</h3>
            <h4>Top 3</h4>
            <ul>
                {li}
            </ul>
            <Link className="panelList-panel" to={`/search`}>Go to Console</Link>
           </section>
            )
    }     
    
    );
    body = (
        <div className="panelList">
            {section}
        </div> 
    )
    return body
  }
}

export default withRouter(PanelList);