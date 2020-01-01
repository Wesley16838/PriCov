import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import PanelList from './../component/panelList'

const FEED_QUERY =  gql`
    query finduser($email: String!){
        finduser(email:$email){
            _id
            email
            History{
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
    }
`

class Getpanel extends Component {
    constructor(props) {
    
        super(props);
        this.state = {
            email: props.id
        }
    }

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
            if(x < tmp.length - 4){
                if(tmp.charAt(x) === 'e' && tmp.charAt(x+1) === 'b' && tmp.charAt(x+2) === 'a' && tmp.charAt(x+3) === 'y'){
                    return 'ebay';
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
            <Query query={FEED_QUERY} variables={{ email:this.state.email }}>
                {({ loading, error, data, refetch }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>
             
                    var user = data.finduser
                    refetch().then(data => user = data)
                    let obj = {
                        amazon: 0,
                        ebay: 0,
                        bestbuy: 0,
                        other: 0
                    }
                    let historyobj = {}
                    let stasticobj = {}
                    for(var x = 0 ; x < user.History.length ; x++){
                        let tmp = this.contains(user.History[x].url);
                        if(historyobj[user.History[x].keyword] == undefined){
                            historyobj[user.History[x].keyword] = new Array(0);
                        }
                        if(stasticobj[user.History[x].keyword] == undefined){
                            stasticobj[user.History[x].keyword] = {
                                amazon: 0,
                                ebay: 0,
                                bestbuy: 0,
                                other: 0
                            };
                        }
                        user.History[x]['website'] = tmp;
                        historyobj[user.History[x].keyword].push(user.History[x]);
                        stasticobj[user.History[x].keyword][tmp]++;
                    }
                   
                    let historyobjarr = new Array(0);
                    for(var x in historyobj){
                        let re = historyobj[x].sort(function(a, b){return a.price.replace(',','') - b.price.replace(',','')}).slice(0,9);
                        for(var i = 0; i<re.length; i++){
                            re[i]['title'] = re[i]['title']
                        }
                        let tmp = {
                            productName: x,
                            stastistic: stasticobj[x],
                            result: re,
                            max:re[re.length-1].price,
                        }
                        historyobjarr.push(tmp);
                    }
                    console.log('historyobjarr,',historyobjarr)
                    return (
                        <PanelList data={historyobjarr} />
                    )
                }}
            </Query>
        )
    }
}
export default Getpanel