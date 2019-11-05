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

    render() {
        return (
            <Query query={FEED_QUERY} variables={{ id:this.state.id }}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>
                    console.log('user data')
                    console.log(data)
                    const user = data.finduser

                    return (
                        <div>
                            {/* <Link key={user._id} user={user} /> */}
                            {/* Implelent user component here. */}
                            {/* Return data is in 'user' varibale. */}
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default Singleuser