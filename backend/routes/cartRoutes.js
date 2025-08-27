import express from "express"
import { addToCart, getToCart, removeToCart } from "../controller/cartController.js"
import authMiddleware from "../middleware/auth.js"

const cartRoutes = express.Router()
cartRoutes.post("/add",authMiddleware,addToCart)
cartRoutes.post("/remove",authMiddleware,removeToCart)
cartRoutes.get("/get",authMiddleware,getToCart)


export default cartRoutes;