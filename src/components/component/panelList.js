import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route,NavLink, Link } from "react-router-dom"
import {
    withRouter
  } from 'react-router-dom'
import data from './../../Assets/data/history.json'
import BarChart from './../charts/barChart'
import arrow from './../../Assets/img/logo/Forward_arrow.png'
import amazon from './../../Assets/img/logo/amazon_logo.png'
import bestbuy from './../../Assets/img/logo/bestbuy.png'
import target from './../../Assets/img/logo/target.png'
class PanelList extends Component {
constructor(props){
    super(props);
    this.state={
        data:this.props.data
    }
}
componentWillMount(){
   
}
  componentDidMount(){
    
  }
  render() {
    console.log('123')
    console.log("Panel data,", this.state.data)
    let body = null;
    let li = null;
    let section = null;
    let logo = null;
    let logo_arr=[]
    console.log("in panellist render!!!")
    section = this.state.data && this.state.data.map(next => {

        for(var i in next.stastistic){
            console.log('i,',i)
            if(next.stastistic[i]!=0){
                console.log('yes')
                logo_arr.push(i)
            }
        }

        console.log('check1,',logo_arr)
        console.log('next,',next)
      
        li = next.result.slice(0,3).map(item=>{
            console.log('item,',item)
            return (
            <li key={item.title}>
             - {item.title} ({item.website})
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
            <BarChart data={next.result}/>
            <div className="panelList-console">
           
                    <div className="panelList-logo">
                    <ul>
                         {logo = logo_arr.map(item=>{
                             if(item == 'amazon'){
                                return(                      
                                    <li >
                                    <img src={amazon}/>
                                    </li>
                                )
                             }else if(item == 'target'){
                                return(                      
                                    <li >
                                    <img src={target}/>
                                    </li>
                                )
                             }else if(item == 'bestbuy'){
                                return(                      
                                    <li >
                                    <img src={bestbuy}/>
                                    </li>
                                )
                             }
                             
                         })}
                    </ul>
                   
                    </div>
                    <div className="panelList-panel">
                        <Link  to={`/search`}>Go to Console<img src={arrow}/></Link>
                    </div>
                    
           
                
            </div>
            
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