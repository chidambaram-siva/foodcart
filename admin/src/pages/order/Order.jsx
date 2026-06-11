import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets, url } from "../../assets/assets.js";
import "./Order.css";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async (req, res) => {
    const response = await axios.get(
      `${url}/api/order/listorders`
    );
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("error");
    }
  };
  const statusHandler = async(event,orderId)=>{
    const response = await axios.post( `${url}/api/order/status`,{orderId,status:event.target.value})
    if(response.data.success){
     await fetchAllOrders()
    }

  }
  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <div className="order-add">
      <h1>Order</h1>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-items-food">
                {order.items.map((item, index) => {
                  if (index == order.items.length - 1) {
                    return item.name + "X" + item.quantity;
                  } else {
                    return item.name + "X" + item.quantity + ",";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + "" + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street}</p>
                <p>
                  {order.address.state +
                    "," +
                    order.address.country +
                    "," +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phonenumber">{order.address.phone}</p>
            </div>
            <p>Items:{order.items.length}</p>
            <p> ${order.amount}</p>
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} >
              <option value="Food processing">Food processing</option>
              <option value="Out of order">Out of order</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
