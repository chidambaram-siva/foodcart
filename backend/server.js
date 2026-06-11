import express from "express";
import cors from "cors";
import "dotenv/config"
import { connectdb } from "./config/db.js";
import foodRoutes from "./routes/foodRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());                 
app.use(express.json());         
app.use("/image", express.static("uploads"));
connectdb();

app.use("/api/food", foodRoutes);
app.use("/api/user",userRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/order",orderRouter)
app.listen(PORT, () => {
  console.log("Server running on " + PORT);
});
