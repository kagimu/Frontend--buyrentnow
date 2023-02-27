// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";


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
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});

export function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}
export function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}