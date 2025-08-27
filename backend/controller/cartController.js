import userModel from "../models/userModels.js";
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.userId });
    let cardData = await userData.cartData;
    if (!cardData[req.body.id]) {
      cardData[req.body.id] = 1;
    } else {
      cardData[req.body.id] += 1;
    }
    await userModel.findByIdAndUpdate(req.userId, { cartData: cardData });
    res.json({ success: true, message: "added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};
const removeToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.userId });
    let cardData = await userData.cartData;
    if (cardData[req.body.id]) {
      cardData[req.body.id] -= 1;
      await userModel.findByIdAndUpdate(req.userId, { cartData: cardData });
      res.json({ success: true, message: "Removed from cart" });
    }
  } catch (error) {
    res.json({ success: false, message: "error" });
  }
};

const getToCart = async (req, res) => {
  try {
    const userId = req.userId;

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server error" });
  }
};

export { addToCart, removeToCart, getToCart };
