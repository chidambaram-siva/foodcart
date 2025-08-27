import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { StoreContext } from '../../context/StoreContext'
import "./Placeorder.css"
import { useNavigate } from 'react-router-dom'

const Placeorder = () => {
    const { gettotalAmount, food_list, token, CartItems } = useContext(StoreContext)
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        state: "",
        city: "",
        country: "",
        zipcode: "",
        phone: ""
    })
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }))
    }
    const placeOrder = async (event) => {
        event.preventDefault()
        let orderItem = []
        food_list.map((item) => {
            if (CartItems[item._id] > 0) {
                let itemInfo = item
                itemInfo["quantity"] = CartItems[item._id]
                orderItem.push(itemInfo)

            }

        })
        const orderData = {
            address: data,
            items: orderItem,
            amount: gettotalAmount() + 2
        }
let response = await axios.post(`http://localhost:4000/api/order/place`, orderData, {
    headers: { token },
});
if (response.data.success) {
    const { success_url } = response.data;
    window.location.replace(success_url);
} else {
    alert("Payment session creation failed.");
}

    }
    const navigate = useNavigate()
    useEffect(()=>{
        if(!token){
          navigate('/cart')
        }
        else if(gettotalAmount()===0){
          navigate('/cart')
        }
        
    })

    return (
        <form onSubmit={placeOrder} className='order'>
            <div className='order-left'>
                <h1 className='order-title'>Delivery Information</h1>
                <div className='order-multifield'>
                    <input required onChange={onChangeHandler} name="firstName" value={data.firstName} type="text" placeholder='First Name' />
                    <input required onChange={onChangeHandler} name="lastName" value={data.lastName} type="text" placeholder='Last Name' />
                </div>
                <input required onChange={onChangeHandler} name="email" value={data.email} type="text" placeholder='Email Address' />
                <input required onChange={onChangeHandler} name="street" value={data.street} type="text" placeholder='Address' />
                <div className='order-multifield'>
                    <input required onChange={onChangeHandler} name="city" value={data.city} type="text" placeholder='city' />
                    <input required onChange={onChangeHandler} name="state" value={data.state} type="text" placeholder='State' />
                </div>
                <div className='order-multifield'>
                    <input required onChange={onChangeHandler} name="zipcode" value={data.zipcode} type="text" placeholder='Zip code' />
                    <input required onChange={onChangeHandler} name="country" value={data.country} type="text" placeholder='country' />
                </div>

                <input required onChange={onChangeHandler} name="phone" value={data.phone} type="text" placeholder='Phone no' />

            </div>
            <div className="order-right">
                <div className='cart-total'>
                    <h2 className='total'>Cart Total</h2>
                    <div className="cart-total-item">
                        <p>SubTotal</p>
                        <p>{gettotalAmount()}</p>

                    </div>
                    <hr />
                    <div className="cart-total-item">
                        <p>Delivery Fee</p>
                        <p>{gettotalAmount() == 0 ? 0 : 2}</p>

                    </div>
                    <hr />
                    <div className="cart-total-item">
                        <b>Total</b>
                        <p>{gettotalAmount() == 0 ? 0 : gettotalAmount() + 2}</p>
                    </div>
                    <hr />
                    <button type='submit' className='cart-button-proceed'>PROCEED TO CHECKOUT </button>
                </div>
            </div>
        </form>
    )
}

export default Placeorder
