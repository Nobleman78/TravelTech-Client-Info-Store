// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCar2Efkuf_GIuSUGOek98UI2PN1m3JAms",
    authDomain: "traveltech-4787f.firebaseapp.com",
    projectId: "traveltech-4787f",
    storageBucket: "traveltech-4787f.firebasestorage.app",
    messagingSenderId: "368351090761",
    appId: "1:368351090761:web:2e71ecdfa3006cf5fc0798"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)