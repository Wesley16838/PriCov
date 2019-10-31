import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Link from './Link'

const FEED_QUERY = gql`
  query{
    feed{
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

class LinkList extends Component {
  constructor(props){
    console.log('in LinkList!')
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    this.props.onRef(this)
  }
  reload = () => {
    this.setState({ reload: true });
  }

  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>
          //console.log(data)
          const usersToRender = data.feed
          
          return (
            <div>
              {usersToRender.map(user => <Link key={user._id} user={user} />)}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default LinkList