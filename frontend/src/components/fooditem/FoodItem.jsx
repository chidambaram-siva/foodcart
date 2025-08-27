import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const{removeItems,addItems,CartItems}=useContext(StoreContext);
  return (
    <div className="food-items">
      <div className="item-img">
        <img src={"http://localhost:4000/image/"+image} alt="" />
        {!CartItems[id] ? (
          <div className="item-white-img">
            <img
              onClick={()=>addItems(id)}
              
              src={assets.add_icon_white}
              alt=""
            />
          </div>
        ) : (
          <div className="itemcount-icons">
            
            <img
              onClick={()=>removeItems(id)}
              src={assets.remove_icon_red}
              alt=""
            />
          
            {CartItems[id]}
            <img
              onClick={()=>addItems(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-items-contain">
        <div className="food-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-items-description">{description}</p>
        <p className="food-items-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
