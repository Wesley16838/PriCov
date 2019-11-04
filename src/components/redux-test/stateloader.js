function loadState() {
    try {
        let serializedState = localStorage.getItem("http://pricov.com:state");

        if (serializedState === null) {
            return this.initializeState();
        }

        return JSON.parse(serializedState);
    }
    catch (err) {
        return initializeState();
    }
}

function saveState(state) {
    try {
        let serializedState = JSON.stringify(state);
        localStorage.setItem("http://pricov.com:state", serializedState);

    }
    catch (err) {
    }
}

function initializeState() {
    return {
        loginReducer: false,
        word: "login",
        to: "/Signin"
    }
}


module.exports = {
    loadState,
    saveState
}