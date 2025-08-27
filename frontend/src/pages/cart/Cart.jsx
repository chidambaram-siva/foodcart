import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext';
import './Cart.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate =useNavigate();

    const { removeItems,
        addItems,
        CartItems, food_list,gettotalAmount } = useContext(StoreContext);
    return (
        <div>
            <div className="cart">
                <div className="cart-items">
                    <div className="cart-items-title">
                        <p>Item</p>
                        <p>Name</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Total</p>
                        <p>Remove</p>
                    </div>
                    <br />
                    <hr />
                    <div>
                        {food_list.map((item, index) => {
                            if (CartItems[item._id] > 0) {
                                return (
                                    <div key={item._id}>
                                        <div className="cart-items-title cart-items-item">
                                            <img src={"http://localhost:4000/image/"+item.image} alt="" />
                                            <p>{item.name}</p>
                                            <p>{item.price}</p>
                                            <p>{CartItems[item._id]}</p>
                                            <p>{item.price * CartItems[item._id]}</p>
                                            <p className='cart-remove' onClick={() => removeItems(item._id)}>X</p>

                                        </div>
                                        <hr />
                                    </div>

                                )
                            }

                        })}
                    </div>
                    <div className='cart-bottom'>
                        
                        <div className='cart-total'>
                            <h2 className='total'>Cart Total</h2>
                            <div className="cart-total-item">
                                <p>SubTotal</p>
                                <p>{gettotalAmount()}</p>
                                
                            </div>
                            <hr />
                            <div className="cart-total-item">
                                <p>Delivery Fee</p>
                                <p>{gettotalAmount()==0?0:2}</p>
                                
                            </div>
                            <hr />
                            <div className="cart-total-item">
                                <b>Total</b>
                                <p>{gettotalAmount()==0?0:gettotalAmount()+2}</p>  
                            </div>
                            <hr />
                             <button onClick={() => navigate('/order')}className='cart-button-proceed'>PROCEED TO CHECKOUT </button>
                        </div>
                        <div className='promocode'>
                             <p>If you have promocode please enter here</p>
                            <div className='promocode-input'>
                               
                                
                                <input type="text" placeholder='promo code'/>
                                <button>Submit Code</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Cart
