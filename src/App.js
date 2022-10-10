import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
//import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from './Payment';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Orders from './Orders';

const promise = loadStripe(
    "pk_test_51L981ASCzgpQfL3tndASsuI6tIYqLOAGhN0JctBO8O5ft01Bfr1KVlG41G302zT5ELB7VO74Jihkrd8KRtDctoBz00qacls2la"
   // "pk_test_51LpZB0EMn6PIPrbb4J3X8jWXlc0cKvArP4jZBNCy34z5Iyskxl0ABqC5hESTMRlhxkHsDC5xHPT47BWyb8RCZVWG00WFhh1rIT"
    );
  

function App() {

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        dispatch({
          type: "SET_USER",
          user: user,
        });
        // ...
      } else {
        // User is signed out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route
            exact
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            exact
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          />
          <Route
            exact
            path="/payment"
            element={
              <>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </>
            }
          />
          <Route
            exact
            path="/orders"
            element={
              <>
                <Header />
                <Orders />
              </>
            }
          />

  
        </Routes>
      </div>
    </Router>
  );
}

export default App;


// function App() {
//   return (
//     //BEM
//     <Router>
//       <div className="app">
        
//         <Switch>

//           <Route path="/login">
//             <Login />  
//           </Route>
          
//           <Route path="/checkout">
//             <Header />
//             <Checkout />
//           </Route>

//           <Route path="/">
//             <Header />
//             <Home/>
//           </Route>  

//         </Switch>  
//       </div>
//     </Router>
//   );
// }