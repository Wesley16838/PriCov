import React, {Component} from 'react';
import { BrowserRouter as Route, Link } from "react-router-dom"
import {
    withRouter
  } from 'react-router-dom'

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

    let body = null;
    let li = null;
    let section = null;
    let logo = null;
    let logo_arr=[]
  
    section = this.state.data && this.state.data.map(next => {

        for(var i in next.stastistic){
        
            if(next.stastistic[i]!==0){
               
                logo_arr.push(i)
            }
        }

      
      
        li = next.result.slice(0,3).map(item=>{
         
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
                             if(item === 'amazon'){
                                return(                      
                                    <li >
                                    <img src={amazon} alt='amazon'/>
                                    </li>
                                )
                             }else if(item === 'target'){
                                return(                      
                                    <li >
                                    <img src={target} alt='target'/>
                                    </li>
                                )
                             }else if(item === 'bestbuy' ){
                                return(                      
                                    <li >
                                    <img src={bestbuy} alt='bestbuy'/>
                                    </li>
                                )
                             }
                             
                         })}
                    </ul>
                   
                    </div>
                    <div className="panelList-panel">
                        <Link to={`/search`}>Go to Console<img src={arrow} alt="arrow"/></Link>
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