import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDG1PuM01DEIaw-5zquOTC9C36WwjYxg0E",
    authDomain: "scoutap-4025a.firebaseapp.com",
    projectId: "scoutap-4025a",
    storageBucket: "scoutap-4025a.appspot.com",
    messagingSenderId: "108931452781",
    appId: "1:108931452781:web:d2fec8c80a953dbb871464",
    measurementId: "G-8BD4ZP80KG"
};

// Initialize Fireb
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()

export { auth };  