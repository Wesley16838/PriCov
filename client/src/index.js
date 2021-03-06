import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Appollo Libraries
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

//Redux Lidraries
import { Provider } from "react-redux";
import store from "./components/redux-test/store"

//ReactDOM.render(<App />, document.getElementById('root'));
// const httpLink = createHttpLink({
//     uri: '/graphql',
//     onError: ({ networkError, graphQLErrors }) => {
//         console.log("graphQLErrors", graphQLErrors);
//         console.log("networkError", networkError);
//       }
// });

// const client = new ApolloClient({
//     link: httpLink,
//     cache: new InMemoryCache()
// });

ReactDOM.render(
    <Provider store={store}>
        {/* <ApolloProvider client={client}> */}
            <App />
        {/* </ApolloProvider> */}
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
