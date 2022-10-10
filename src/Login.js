import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, registerWithEmailAndPassword} from "./firebase";
import "./Login.css";

function Login() {
    
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
        
          const uid = user.uid;
          console.log(uid);
          navigate("../",{replace: true});
          // ...
        } else {
          // User is signed out
          console.log("user isn't Signed-In");
        }
      });
  }, []);

  const signIn = (e) => {
    e.preventDefault();

    //Todo: Logics to implement firebase authentication...
    logInWithEmailAndPassword(email, password);
  };
  const register = (e) => {
    e.preventDefault();
    
    //Todo: Logics to implement firebase authentication to register...
    registerWithEmailAndPassword("Rishav-testing", email, password);
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://levrose.com/wp-content/uploads/2020/08/amazon.jpg"
        />
      </Link>

      <div className="login__container">
        <h1>Sign In</h1>

        <form action="">
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login__signInButton" onClick={signIn}>
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button onClick={register} className="login__registerButton">
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;

//import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import './Login.css'
// import { auth, registerWithEmailAndPassword, createUserWithEmailAndPassword }  from "./firebase";

// function Login() {

//     const navigate = useNavigate()
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')

//     const signIn = e => {
//         //to not refresh
//         e.preventDefault()

//         //firebase login
//     }

//     const register = e => {
//         e.preventDefault()
        
//         //firebase register
//         auth.createUserWithEmailAndPassword(email, password)
//         .then((auth) => {
//             //it successfully created a new user with email and password
//             if (auth) {
//                 navigate.push('/')
//             }
//         })
//         .catch(error => alert(error.message))
//     }

//     return (
//         <div className='login'>
//             <Link to='/'>
//                 <img
//                     className='login__logo' 
//                     src='https://levrose.com/wp-content/uploads/2020/08/amazon.jpg' 
//                 />
//             </Link>

//             <div className='login__container'>
//                 <h1>Sign-in</h1>
//                 <form>
//                     <h5>E-mail</h5>
//                     <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>

//                     <h5>Password</h5>
//                     <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

//                     <button type='submit' 
//                         onClick={signIn} 
//                         className='login__signInButton'>Sign In</button>
//                 </form>
                
//                 <p>
//                     By signing-in you agree to the AMAZON CLONE Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice
//                 </p>

//                 <button onClick={register} 
//                 className='login__registerButton'>Create your Amazon Account</button>
//             </div>
//         </div>
//     )
// }

// export default Login