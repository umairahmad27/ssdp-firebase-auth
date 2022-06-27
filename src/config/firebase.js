// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBtvMFEI7a5iEXIphBFi3C6cFj1X19xZWI",
    authDomain: "ecommerce-app-1234.firebaseapp.com",
    projectId: "ecommerce-app-1234",
    storageBucket: "ecommerce-app-1234.appspot.com",
    messagingSenderId: "218559696878",
    appId: "1:218559696878:web:23b9c92ff6fa7a49fc08ff",
    measurementId: "G-1MQVJH5RW6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { analytics, auth }