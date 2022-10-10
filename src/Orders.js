import React, { useState, useEffect } from "react";
import "./Orders.css";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";
import {collection, doc, getDoc, getDocs, orderBy, query, where} from "firebase/firestore";
import Order from "./Order";

function Orders() {
  const [{basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  const fetchUserData = async () => {
    try {
      const ordersDocRef = doc(db, "users", user?.uid);
    const docSnap = await getDoc(ordersDocRef)
    // console.log(docSnap.data().orders.basket);
      setOrders([...orders,{id:docSnap.data().orderBy("created","desc").id,data: docSnap.data().orderBy("created","desc")}]);
    } catch (err) {
      console.error(err);
    //   alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {

    fetchUserData();
    
  }, []);

  // useEffect(() => {
  //   if(user) {
  //     db.collection('users')
  //       .doc(user?.uid)
  //       .collection('orders')
  //       .orderBy('created', 'desc')
  //       .onSnapshot(snapshot => (
  //         setOrders(snapshot.docs.map(doc => ({
  //           id: doc.id,
  //           data: doc.data()
  //         })))
  //   ))
  //   } else {
  //     setOrders([])
  //   }    
  // }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {orders?.map(order => (
          <Order order={order}/>
        ))} 
      </div>
    </div>
  );
}

export default Orders;