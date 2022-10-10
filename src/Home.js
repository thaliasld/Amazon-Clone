import React from 'react'
import "./Home.css"
import Product from "./Product"

function Home() {
  return (
    <div className='home'>
        <div className='home__container'>
            <img className='home_image' 
            src="https://amazon-clone-with-stripe-payment.netlify.app/images/banner.jpg" alt=""
            />

            <div className='home__row'>
                <Product 
                    id='12345345'
                    title='Chanel: Collections and Creations Hardcover – Illustrated, January 1, 2007' 
                    price={24.00} 
                    image='https://images-na.ssl-images-amazon.com/images/I/311C7Xb-2FL._SX427_BO1,204,203,200_.jpg' 
                    rating={5}
                />
                <Product
                    id='12348573'
                    title='Echo Studio with Echo Sub' 
                    price={247.49} 
                    image='https://m.media-amazon.com/images/I/61VE-c5gWuL._AC_SX679_.jpg' 
                    rating={4}
                />
            </div>
            
            <div className='home__row'>
                <Product
                    id='17684365'
                    title='Gotrax GXL V2 Electric Scooter, 8.5"' 
                    price={331.49} 
                    image='https://m.media-amazon.com/images/I/513CZmEEAVL._AC_SX679_.jpg' 
                    rating={4}
                />
                <Product
                    id='93745345'
                    title='Micro Center SuperSpeed 10 Pack 64GB USB 3.0 Flash Drive' 
                    price={53.49} 
                    image='https://m.media-amazon.com/images/I/71xDd9+MarL._AC_SX466_.jpg' 
                    rating={3}
                />
                <Product
                    id='95763254'
                    title='AmazerBath Bath Shower Loofah Sponge Exfoliating Body Scrubber 60g/PCS Pouf Bath Sponges- Set of 4, Neutral Colors' 
                    price={10.49} 
                    image='https://m.media-amazon.com/images/I/81FEQVrzC9S._SX466_.jpg' 
                    rating={5}
                />
            </div>

            <div className='home__row'>
                <Product
                    id='12830145'
                    title='MANSPOT Ball Trimmer/Shaver, Electric Trimmer for Men, Replaceable Ceramic Blade Heads, Waterproof Wet/Dry Groin & Body Trimmer for Men, 90 Minutes Shaving After Fully Charged' 
                    price={40.00} 
                    image='https://m.media-amazon.com/images/I/61bUslJv9sL._AC_SX679_.jpg' 
                    rating={4}
                />
            </div>

        </div>
    </div>
  )
}

export default Home; 
