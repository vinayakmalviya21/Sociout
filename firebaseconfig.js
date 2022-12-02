// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
// import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
// import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBoP-S1s1sBLwTfukFUfGZ3StLCq3fimu4",
    authDomain: "sociout-2022.firebaseapp.com",
    projectId: "sociout-2022",
    storageBucket: "sociout-2022.appspot.com",
    messagingSenderId: "130560702704",
    appId: "1:130560702704:web:764e0c4cd9d9941dafea35",
    measurementId: "G-09QR931WB7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const database = getDatabase(app);
