// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtvnnINiqprs2QXY_5nh0emHijIshQSbs",
  authDomain: "testapp-d3d3d.firebaseapp.com",
  projectId: "testapp-d3d3d",
  storageBucket: "testapp-d3d3d.appspot.com",
  messagingSenderId: "939768736675",
  appId: "1:939768736675:web:cd7d6602224d0049238816",
  measurementId: "G-13DYKHP47Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();