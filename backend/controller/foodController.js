import foodModel from "../models/foodModels.js";
import fs from "fs";

const addFood = async (req, res) => {
  try {
    console.log(" req.body:", req.body);
    console.log(" req.file:", req.file);

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image file is required" });
    }

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.file.filename,
      category: req.body.category,
    });

    await food.save();

    res.status(200).json({ success: true, message: "Food added successfully" });
  } catch (error) {
    console.error(" Error in addFood:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const listFood = async (req, res) => {
  try {
    const list_food = await foodModel.find({});
    res.json({ success: true, data: list_food });
  } catch (error) {
    res.json({ message: "error" });
  }
};
const removeFood = async (req, res) => {
  try {
    const deletes = await foodModel.findById(req.body.id);
    fs.unlink(`/uploads/${deletes.image}`, () => {});

    const removes = await foodModel.findByIdAndDelete(req.body.id);
    res.json({ message: "item removed" });
  } catch (error) {
    res.json({ message: "error" });
  }
};
export { addFood, listFood, removeFood };
