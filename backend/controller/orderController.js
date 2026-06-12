import orderModel from "../models/orderModels.js";
import userModel from "../models/userModels.js";
import Stripe from "stripe";
import "dotenv/config";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {

  const frontend_url = "https://foodcart-mocha.vercel.app/";

  try {
    const newOrder = new orderModel({
      userId: req.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 80
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, success_url: session.url }); 
  } catch (error) {
    console.error("Stripe error:", error);
    res.json({ success: false, message: "error" });
  }
  
};
const verifyOrder= async(req,res)=>{
    const {orderId , success}= req.body;
    try {
      if(success=="true"){
         await orderModel.findByIdAndUpdate(orderId,{payment:true})
         res.json({success:true,message:"paid"})
      } else{
         await orderModel.findByIdAndDelete(orderId)
         res.json({success:false,message:"not paid"})

      }
    } catch (error) {
        res.json({success:false,message:"error"})
    }
  }
  const userOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId });

    // Ensure every order has `items` as an array
    const safeOrders = orders.map(order => ({
      ...order.toObject(),
      items: Array.isArray(order.items) ? order.items : []
    }));

    res.json({ success: true, data: safeOrders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.json({ success: false, message: "error" });
  }
};
const listOrder= async(req,res)=>{
  try {
    const order = await orderModel.find({})
    res.json({success:true,data:order})
  } catch (error) {
    res.json({success:false,message:"error"})
  }
}
const updateStatus=async(req,res)=>{
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"Status Updated"})
  } catch (error) {
    
  }
}

export { placeOrder,verifyOrder,userOrder,listOrder,updateStatus};
