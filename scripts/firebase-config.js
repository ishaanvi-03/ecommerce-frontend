// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjlEqep7lIK5oy4A8fE17fwE_e696NUSE",
  authDomain: "ecommerce-frontend-49341.firebaseapp.com",
  projectId: "ecommerce-frontend-49341",
  storageBucket: "ecommerce-frontend-49341.firebasestorage.app",
  messagingSenderId: "382374619941",
  appId: "1:382374619941:web:f6f0d97a840b66dac588cc",
  measurementId: "G-M6VVMDKJ5R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);