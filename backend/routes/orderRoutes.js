import express from "express"
import authMiddleware from "../middleware/auth.js"
import { listOrder, placeOrder, updateStatus, userOrder, verifyOrder } from "../controller/orderController.js"

const orderRouter = express.Router()
orderRouter.post("/place",authMiddleware,placeOrder) 
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders",authMiddleware,userOrder)
orderRouter.get("/listorders",listOrder)
orderRouter.post("/status",updateStatus)

export default orderRouter