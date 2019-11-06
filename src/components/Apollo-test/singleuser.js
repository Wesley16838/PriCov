import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Link from './Link'

const FEED_QUERY =  gql`
    query finduser($id: ID!){
        finduser(_id:$id){
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
            }
        }
    }
`

class Singleuser extends Component {
    constructor(props) {
        console.log('in Singleuser!')
        console.log(props.id)
        super(props);
        this.state = {
            id: props.id
        }
    }

    reload = () => {
        this.setState({ reload: true });
    }

    contains(url) {
        var tmp = url.toLowerCase();
        for(var x = 0 ; x < tmp.length ; x++){
            if(x < tmp.length - 6){
                if(tmp.charAt(x) == 'a' && tmp.charAt(x+1) == 'm' && tmp.charAt(x+2) == 'a' && tmp.charAt(x+3) == 'z' && tmp.charAt(x+4) == 'o' && tmp.charAt(x+5) == 'n'){
                    return 'amazon';
                }
            }
            if(x < tmp.length - 6){
                if(tmp.charAt(x) == 't' && tmp.charAt(x+1) == 'a' && tmp.charAt(x+2) == 'r' && tmp.charAt(x+3) == 'g' && tmp.charAt(x+4) == 'e' && tmp.charAt(x+5) == 't'){
                    return 'target';
                }
            }
            if(x < tmp.length - 7){
                if(tmp.charAt(x) == 'b' && tmp.charAt(x+1) == 'e' && tmp.charAt(x+2) == 's' && tmp.charAt(x+3) == 't' && tmp.charAt(x+4) == 'b' && tmp.charAt(x+5) == 'u' && tmp.charAt(x+6) == 'y'){
                    return 'bestbuy';
                }
            }
        }
        return 'other'
    }

    render() {
        return (
            <Query query={FEED_QUERY} variables={{ id:this.state.id }}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>
                    console.log('user data')
                    console.log(data)
                    const user = data.finduser
                    let obj = {
                        amazon: 0,
                        target: 0,
                        bestbuy: 0,
                        other: 0
                    }
                    for(var x = 0 ; x < user.History.length ; x++){
                        obj[this.contains(user.History[x].url)]++;
                    }
                    console.log('obj',obj);
                    return (
                        <div>
                            {/* <Link key={user._id} user={user} /> */}
                            {/* Implelent user component here. */}
                            {/* Return data is in 'user' varibale. */}
                            {/* Stastistic data is in 'obj' varibale. */}
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default Singleuser