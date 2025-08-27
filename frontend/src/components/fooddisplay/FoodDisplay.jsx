import { useContext } from "react";

import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../fooditem/FoodItem";
import "./FoodDisplay.css"

const FoodDisplay = ({category}) => {
  const { food_list } = useContext(StoreContext);
  return (
    <div className="food-display">
      <h1>Top Dishes on your item</h1>
      <div className="food-item">
        {food_list.map((item, index) => {
          if(category==="All"||category===item.category){
          return (
            <FoodItem
              key={index}
              name={item.name}
              id={item._id}
              image={item.image}
              price={item.price}
              description={item.description}
            />
          );}
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
