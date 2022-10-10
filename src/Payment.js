import React, { useEffect, useState } from 'react'
import CheckoutProduct from './CheckoutProduct'
import './Payment.css'
import { useStateValue } from './StateProvider'
import { Link, useNavigate } from "react-router-dom";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format"
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { collection, doc, setDoc } from "firebase/firestore";
import {db} from './firebase'

function Payment() {
    
    const [{ basket, user}, dispatch] = useStateValue()
    
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");

    const [clientSecret, setClientSecret] = useState(true);

    const navigateTo = useNavigate();
  
    useEffect(() => {
        //whenever the basket changes:
        //generating the special stripe secret 
        //which allows us to charge a customer the correct amount
        const getClientSecret = async () => {
          const response = await axios({
            method: "post",
            // Stripe expects the total in a currencies sub-units
            url: `/payments/create?total=${parseInt(getBasketTotal(basket) * 100 )}`,
          });
          setClientSecret(response.data.clientSecret);
        };
        getClientSecret();
      }, [basket]);

     console.log('THE SECRET IS >>>>>', clientSecret)
     console.log("ommmm", user)

    const handleSubmit = async (e) => {
        //do the stripe stuff..
        e.preventDefault();
        setProcessing(true);
        const payload = await stripe
        .confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        })
        .then(({ paymentIntent }) => {
          // Payment Intent is Payment Confirmation   
  
        const ordersDocRef = doc(db, "users", user?.uid);
         setDoc(ordersDocRef, {
          orders:{
            basket,
            amount:12334, //paymentIntent.amount || null,
            created: 223311, //paymentIntent.created || null,
          }
          })

          // db.collection('users')
          // .doc(user?.uid)
          // .collection('orders')
          // .doc(paymentIntent.id)
          // .set({
          //   basket: basket,
          //   amount: paymentIntent.amount,
          //   created: paymentIntent.created
          // })

        
          
          setSucceeded(true);
          setError(null);
          setProcessing(false);
  
          dispatch({
            type: "EMPTY_BASKET",
          });
  
          navigateTo('../orders',{replace:true});
        });
    }

    const handleChange = async (e) => {
        //Listen for changes in the CardElement
        //and display errors as the customer types their card details
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }

  return (
    <div className='payment'>
        <div className='payment__container'>
            <h1>
                Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
            </h1>
            {/* Payment section - delivery address */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment__address'>
                    <p>{user?.email}</p>
                    <p>123 React Lane</p>
                    <p>Los Angeles, CA</p>
                </div>
                
            </div>
            {/* Payment section - review items */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Review items and delivery</h3>
                </div>
                <div className='payment__items'>
                    {basket.map(item => (
                        <CheckoutProduct
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                      />
                    ))}
                </div>
            </div>
            {/* Payment section - payment method */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Payment Method</h3>
                </div>
                <div className='payment__details'>
                    {/* Stripe magic will go here */}
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>
                        <div className='payment__priceContainer'>
                            <CurrencyFormat
                                renderText={(value) => <h3>Order Total: {value}</h3>}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType="text"
                                thousandSeperator={true}
                                prefix="$"
                            />
                            <button disabled={processing || disabled || succeeded}>
                                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                            </button>
                        </div>
                        {/* Errors */}
                        {error && <div>error</div>}
                    </form>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Payment