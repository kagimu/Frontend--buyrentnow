// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDG1PuM01DEIaw-5zquOTC9C36WwjYxg0E",
    authDomain: "scoutap-4025a.firebaseapp.com",
    projectId: "scoutap-4025a",
    storageBucket: "scoutap-4025a.appspot.com",
    messagingSenderId: "108931452781",
    appId: "1:108931452781:web:d2fec8c80a953dbb871464",
    measurementId: "G-8BD4ZP80KG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
