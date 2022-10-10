//Import the functions you need from the SDKs you need
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut,} from "firebase/auth";
  import { initializeApp } from "firebase/app";
  import { getAnalytics } from "firebase/analytics";
  import {getFirestore, query, getDocs,collection,where,addDoc, } from "firebase/firestore";
  
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCkbXgP8Bhz7yBgQAFfXjyNy_w3eWHwzAU",
    authDomain: "clone-d38e4.firebaseapp.com",
    projectId: "clone-d38e4",
    storageBucket: "clone-d38e4.appspot.com",
    messagingSenderId: "76662155895",
    appId: "1:76662155895:web:6d3028c9b8109dcff5f472",
    measurementId: "G-H85E83GLQG"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // const user = res.user;
    
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  
  const logout = () => {
    signOut(auth);
  };
  
  export {db, auth, analytics, logInWithEmailAndPassword, registerWithEmailAndPassword,
    logout,
  };

// import { initializeApp } from 'firebase/app';
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyCkbXgP8Bhz7yBgQAFfXjyNy_w3eWHwzAU",
//     authDomain: "clone-d38e4.firebaseapp.com",
//     projectId: "clone-d38e4",
//     storageBucket: "clone-d38e4.appspot.com",
//     messagingSenderId: "76662155895",
//     appId: "1:76662155895:web:6d3028c9b8109dcff5f472",
//     measurementId: "G-H85E83GLQG"
//   };

//   const app = initializeApp(firebaseConfig);

//   const db = getFirestore(app);
//   const auth = getAuth(app);

//   export { db, auth };