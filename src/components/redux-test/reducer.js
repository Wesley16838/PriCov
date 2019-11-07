import { combineReducers } from "redux";

const loginReducer = (state = false, action) => {
    // We never mutate the state, we always return a new state
    // For array or object operations, use the spread operator [..., ] {..., }
    switch (action.type) {
        case "login":
            return {loginReducer:true, word: 'Log out', to: '/'};
        case "logout":
            return {loginReducer:false, word: 'Log In', to: '/Signin'};;
        case "SPEC":
            return action.payload;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    loginReducer
    // you would add more reducers here for more stateful parts of your app
});

export default rootReducer;
