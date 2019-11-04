import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import logger from "redux-logger";
import StateLoader from "./stateloader"

const store = createStore(reducer, StateLoader.loadState(), applyMiddleware(logger));

store.subscribe(() => {
    console.log('Subscribe!')
    console.log(store.getState());
    console.log('local storage bef');
    console.log(StateLoader.loadState())
    StateLoader.saveState(store.getState());
    console.log('local storage aft');
    console.log(StateLoader.loadState())
});

export default store;