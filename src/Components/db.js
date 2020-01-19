import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCQkS7uQtKCW6OiAJMybxaSE0uuMS43PmA",
    authDomain: "nu-shopping-cart.firebaseapp.com",
    databaseURL: "https://nu-shopping-cart.firebaseio.com",
    projectId: "nu-shopping-cart",
    storageBucket: "nu-shopping-cart.appspot.com",
    messagingSenderId: "481353735334",
    appId: "1:481353735334:web:27d7632a1100e95147a867",
    measurementId: "G-THF1BDJ1BN"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

export default db;
