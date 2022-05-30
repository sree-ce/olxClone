import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyATErN0ZC8nAYiQIxGhoK6LeydVTTvFU7A",
    authDomain: "olxproject-a61b6.firebaseapp.com",
    projectId: "olxproject-a61b6",
    storageBucket: "olxproject-a61b6.appspot.com",
    messagingSenderId: "175901202100",
    appId: "1:175901202100:web:8850fd5281af0d56a8e9e1",
    measurementId: "G-299YMM6SQX"
  };

export default firebase.initializeApp(firebaseConfig)