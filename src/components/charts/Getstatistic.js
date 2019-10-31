import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import DonutChart from './donutChart'
import PieChart from './pieChart'

const FEED_QUERY = gql`
    query{
        getstat{
            website
            department{
                name
                amount
            }
        }
    }
`

class Getstatistic extends Component {
  constructor(props){
    console.log('in constructor getstatistic!')
    super(props);
    this.state = {
    }
  }
  
  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>
          console.log("data from backend")
          console.log(data.getstat)
          let obj = {
            amazon: 0,
            bestbuy: 0,
            target: 0
          }
          caltotal(data , obj);
          let obj2= caldep(data);
            
          console.log('total by website')
          console.log(obj);
          console.log('total by department')
          console.log(obj2);
          return (
            //...to be updated
            <div></div>
          )
        }}
      </Query>
    )
  }
}
  
export default Getstatistic

function caltotal(data , obj){
  for(var x = 0 ; x < data.getstat.length ; x++){
    switch(data.getstat[x].website){
      case 'amazon':
        for(var y = 0 ; y < data.getstat[x].department.length ; y++){
          obj['amazon'] += data.getstat[x].department[y].amount;
        }
        break;
      case 'bestbuy':
        for(var y = 0 ; y < data.getstat[x].department.length ; y++){
          obj['bestbuy'] += data.getstat[x].department[y].amount;
        }
        break;
      case 'target':
        for(var y = 0 ; y < data.getstat[x].department.length ; y++){
          obj['target'] += data.getstat[x].department[y].amount;
        }
      break;
      default:
        console.log('You should not see this! OwO');
    }
  }
}
  
function caldep(data){
  let obj = {}
  for(var x = 0 ; x < data.getstat.length ; x++){
    for(var y = 0 ; y < data.getstat[x].department.length ; y++){
      if(obj[data.getstat[x].department[y].name] === undefined){
        obj[data.getstat[x].department[y].name] = data.getstat[x].department[y].amount;
      }
      else{
        obj[data.getstat[x].department[y].name] += data.getstat[x].department[y].amount;
      }
    }
  }
  var keysSorted = Object.keys(obj).sort(function(a,b){return obj[a]-obj[b]})
  //console.log('keysSorted'); 
  //console.log(keysSorted); 
  let objtmp = {}
  for(var x = 0 ; x < 3 ; x++){
    objtmp[keysSorted[keysSorted.length-1-x]] = obj[keysSorted[keysSorted.length-1-x]];
  }
  return objtmp;
}