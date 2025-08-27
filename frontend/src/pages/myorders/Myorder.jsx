import React, { useContext, useEffect, useState } from "react";
import "./Myorder.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const Myorder = () => {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/order/userorders",
        {},
        { headers: { token } }
      );
      setData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrder();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h1>My Orders</h1>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="Parcel" />
            {Array.isArray(order.items) && order.items.length > 0 ? (
              <p>
                {order.items.map((item, itemIndex) => (
                  <span key={itemIndex}>
                    {item.name} x {item.quantity}
                    {itemIndex < order.items.length - 1 && ", "}
                  </span>
                ))}
              </p>
            ) : (
              <p>No items in this order</p>
            )}
            <p>${order.amount}.00</p>
            <p>Items:{order.items.length}</p>
            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
            <button onClick={fetchorder}>track order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myorder;
