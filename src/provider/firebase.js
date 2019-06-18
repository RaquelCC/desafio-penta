import * as firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCrpfosT0uYM8KpekZO4BHvsAKkiI4r1V0",
    authDomain: "desafio-penta.firebaseapp.com",
    databaseURL: "https://desafio-penta.firebaseio.com",
    projectId: "desafio-penta",
    storageBucket: "desafio-penta.appspot.com",
    messagingSenderId: "392662875414",
    appId: "1:392662875414:web:59dbc9c230f019fb"
};

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

