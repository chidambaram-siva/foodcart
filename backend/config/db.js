import mongoose from "mongoose";

export const connectdb =()=>{
    mongoose.connect('mongodb://localhost:27017/foodcart')
  .then(() => console.log(" Database connected"))
  .catch((error) => console.error(" DB connection error:", error));

}
