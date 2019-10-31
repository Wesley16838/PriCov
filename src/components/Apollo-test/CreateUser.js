import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag'
import LinkList from './LinkList'

const POST_MUTATION = gql`
  mutation PostMutation($email: String!) {
    adduser(email: $email) {
      _id
      email
      History{
          _id
          title
          price
          sale
          img
          url
          user
      }
    }
  }
`

//React hook approach
// function PostMutation(){
//     const [adduser, { data }] = useMutation(POST_MUTATION);
//     let input;
//     return (
//         <div>
//         <form
//           onSubmit={e => {
//             e.preventDefault();
//             adduser({ variables: { email: input.value } });
//             input.value = '';
//             console.log(data);
//           }}
//         >
//           <input
//             ref={node => {
//               input = node;
//             }}
//           />
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     )
// }

//React componenet approach
class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            data: null,
            reload: false
        };
    }

    reloadchild(){
        console.log('this.child')
        console.log(this.child)
        this.child.reload()
    }

    render() {
        const { email } = this.state
        return (
            <div>
                <div className="flex flex-column mt3">
                    <input
                        className="mb2"
                        value={email}
                        onChange={e => this.setState({ email: e.target.value })}
                        type="text"
                        placeholder="email"
                    />
                    {/* <input
                        className="mb2"
                        value={url}
                        onChange={e => this.setState({ url: e.target.value })}
                        type="text"
                        placeholder="The URL for the link"
                    /> */}
                </div>
                <Mutation mutation={POST_MUTATION} variables={{ email }} onCompleted={(data) => this.reloadchild()}>
                    {PostMutation => <button onClick={PostMutation}>Submit</button>}
                </Mutation>
                <LinkList onRef={ref => (this.child = ref)}/>
            </div>
        )
    }
}

export default CreateUser