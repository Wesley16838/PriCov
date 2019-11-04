import React, { Component } from 'react';
// We use connect from react-redux to "connect" our components to our store
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route,Link } from "react-router-dom"

// Import our actions
import { dologin, dologout } from './action';

import store from "./store"

class Button extends Component {
    constructor(props) {
        super(props);
        switch (props.type) {
            case 'login':
                this.state = {
                    word: 'Log in!',
                    to: '/Signin',
                    func: props.login,
                    login: false,
                    tmp: props
                }
                break;
            case 'logout':
                this.state = {
                    word: 'Log out!',
                    to: '/',
                    func: props.logout,
                    login: true,
                    tmp: props
                }
                break;
            default:
                this.state = {
                    word: 'temp',
                    to: 'temp',
                    func: null,
                    tmp: props
                }
        }
    }



    render() {
        console.log('state in render')
        console.log(this.state);
        console.log('store.getState().loginReducer');
        console.log(store.getState().loginReducer.loginReducer);
        return (
            // <button onClick={() => {
            //     if(!store.getState().loginReducer.loginReducer) this.state.tmp.login();
            //     else this.state.tmp.logout();
            // }}>
            //     {store.getState().loginReducer.word? store.getState().loginReducer.word : this.state.word}
            // </button>
            <Link className="basicBtn" to={store.getState().loginReducer.to} onClick={() => {
                if(!store.getState().loginReducer.loginReducer) this.state.tmp.login();
                else this.state.tmp.logout();
            }}>{store.getState().loginReducer.word? store.getState().loginReducer.word : this.state.word}</Link>
        )
    }
}

// We choose what actions to add to our props
const mapDispatchToProps = (dispatch) => ({
    login: () => dispatch(dologin()),
    logout: () => dispatch(dologout())
});

const mapStateToProps = state => ({
    login: state.loginReducer,
    word: state.word,
    to: state.to
});


const ConnectedButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(Button);

export default ConnectedButton;
