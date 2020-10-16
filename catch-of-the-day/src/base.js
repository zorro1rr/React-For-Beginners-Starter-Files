import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseApp = firebase.initializeApp(
    {
        apiKey: "AIzaSyC_2VENGKLfhkSnTWNSIFZeivwYcrcc3c0",
        authDomain: "catch-of-the-day-justin-howard.firebaseapp.com",
        databaseURL: "https://catch-of-the-day-justin-howard.firebaseio.com"
      }
)

const base = Rebase.createClass(firebaseApp.database())
//this is a named export
export { firebaseApp };

//this is a default export
export default base;