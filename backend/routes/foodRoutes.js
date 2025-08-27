import express from "express"
import multer from "multer"
import {addFood, listFood, removeFood} from "../controller/foodController.js";

const foodRoutes = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage:storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, JPG, and PNG files are allowed"));
    }
  },
});

foodRoutes.post("/add",upload.single("image"),addFood);
foodRoutes.get("/get",listFood);
foodRoutes.post("/remove",removeFood);

export default foodRoutes;