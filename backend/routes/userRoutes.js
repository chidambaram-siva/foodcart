import express, { Router } from "express";
import {registerUser,loginUser} from "../controller/userController.js";

const userRoutes = express.Router()
userRoutes.post("/register",registerUser)
userRoutes.post("/login",loginUser)



export default userRoutes;