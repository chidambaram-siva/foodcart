import React from 'react'
import "./Header.css"
import {header_img} from "../../assets/header_img.png";

const Header = () => {
  return (
    <div className='header' style={{ backgroundImage: `url(${header_img})`}}>
        <div className='header-content'>
            <h2>Order your favourite food here</h2>
            <p>Explore and order a variety of delicious meals, snacks, and beverages from local vendors. Whether you're craving spicy, sweet, or savory, we’ve got something for every taste. Fast delivery, easy ordering—your favorite food is just a click away!</p>
            <button>View Cart</button>
        </div>
      
    </div>
  )
}

export default Header
