import firebase from "firebase/app";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyAI9dOKxGIASIzBJg34ZQVMuvuj76hZz7I",
    authDomain: "pricov-d30d8.firebaseapp.com",
    databaseURL: "https://pricov-d30d8.firebaseio.com",
    projectId: "pricov-d30d8",
    storageBucket: "pricov-d30d8.appspot.com",
    messagingSenderId: "793605748970",
    appId: "1:793605748970:web:235936d81a7f33e6c17f93",
    measurementId: "G-DSNLC5BJJL"
};
console.log('1')
firebase.initializeApp(config);
console.log('2')
const auth = firebase.auth();

function isAuthenticated() {
  return auth.currentUser;
}


export { auth, firebase, isAuthenticated };
