import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Table from './../charts/table'

const FEED_QUERY =  gql`
    query findHistory($email: String, $keyword: String!){
        findHistory(email:$email, keyword:$keyword){
            _id
            title
            price
            sale
            url
            img
            user
            keyword 
        }
    }
`

class Getdashboard extends Component {
    constructor(props) {
    
        super(props);
     
        this.state = {
            email: props.id,
            key:props.keyword
        }
    }
    // componentDidMount(){
    //     const {keyword} = this.props.match.params
    //     this.setState({key:keyword})
    // }
    reload = () => {
        this.setState({ reload: true });
    }

    contains(url) {
        var tmp = url.toLowerCase();
        for(var x = 0 ; x < tmp.length ; x++){
            if(x < tmp.length - 6){
                if(tmp.charAt(x) === 'a' && tmp.charAt(x+1) === 'm' && tmp.charAt(x+2) === 'a' && tmp.charAt(x+3) === 'z' && tmp.charAt(x+4) === 'o' && tmp.charAt(x+5) === 'n'){
                    return 'amazon';
                }
            }
            if(x < tmp.length - 6){
                if(tmp.charAt(x) === 't' && tmp.charAt(x+1) === 'a' && tmp.charAt(x+2) === 'r' && tmp.charAt(x+3) === 'g' && tmp.charAt(x+4) === 'e' && tmp.charAt(x+5) === 't'){
                    return 'target';
                }
            }
            if(x < tmp.length - 7){
                if(tmp.charAt(x) === 'b' && tmp.charAt(x+1) === 'e' && tmp.charAt(x+2) === 's' && tmp.charAt(x+3) === 't' && tmp.charAt(x+4) === 'b' && tmp.charAt(x+5) === 'u' && tmp.charAt(x+6) === 'y'){
                    return 'bestbuy';
                }
            }
        }
        return 'other'
    }

    render() {

        return (
            <Query query={FEED_QUERY} variables={{ email:this.state.email, keyword:this.state.key }}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>
             
                    const history = data.findHistory

                    console.log('findhistory',history)

                    let obj = {
                        amazon: 0,
                        target: 0,
                        bestbuy: 0,
                        other: 0
                    }
                    let historyobj = {}
                    let stasticobj = {}
                    for(var x = 0 ; x < history.length ; x++){
                        let tmp = this.contains(history[x].url);
                        if(historyobj[history[x].keyword] == undefined){
                            historyobj[history[x].keyword] = new Array(0);
                        }
                        if(stasticobj[history[x].keyword] == undefined){
                            stasticobj[history[x].keyword] = {
                                amazon: 0,
                                target: 0,
                                bestbuy: 0,
                                other: 0
                            };
                        }
                        history[x]['website'] = tmp;
                        historyobj[history[x].keyword].push(history[x]);
                        stasticobj[history[x].keyword][tmp]++;
                    }
                    console.log('historyobj',historyobj)
                    let historyobjarr = new Array(0);
                  
                    
                    for(var x in historyobj){
                        let tmp = {
                            productName: x,
                            stastistic: stasticobj[x],
                            result: historyobj[x].slice(0,9)
                        }
                        historyobjarr.push(tmp);
                    }
                    
                    historyobjarr[0]['result_new'] = []
                    //product image,product name,price, website, onsale, url 
                    for(var i=0; i<historyobjarr[0].result.length;i++){
                        var obj_new={
                            // "Diff":(parseInt(historyobjarr[0].result[i]['price'])-parseInt(historyobjarr[0].result[i]['sale'])).toString(),
                            "Product Image":historyobjarr[0].result[i]['img'],
                            "Product Name":historyobjarr[0].result[i]['title'],
                            "Price":historyobjarr[0].result[i]['price'],
                            "Website":historyobjarr[0].result[i]['website'],
                            "Special Offer":historyobjarr[0].result[i]['sale'],
                            "Url":historyobjarr[0].result[i]['url']
                            
                        }
                        
                        historyobjarr[0]['result_new'].push(obj_new)
                    }
                    historyobjarr[0]['result_new'] = historyobjarr[0]['result_new'].sort(function(a, b){return a.Price.replace(',','') - b.Price.replace(',','')}).slice(0,9);
                    console.log('historyobjarr,',historyobjarr)
                    return (
                        <Table data={historyobjarr} />
                    )
                }}
            </Query>
        )
    }
}
export default Getdashboard