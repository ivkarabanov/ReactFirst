import Rebase from 're-base';
import firebase from 'firebase'

const app = firebase.initializeApp({
    apiKey: "AIzaSyD845KlmHcyJmIAPnZDS7XVC5tSgtWzoHs",
    authDomain: "catch-of-the-day-fd182.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-fd182.firebaseio.com",
})
const base = Rebase.createClass(app.database());

export default base;