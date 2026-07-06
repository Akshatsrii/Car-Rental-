import express from "express";
import {
  registerUser,
  loginUser,
  getUserData,
  getCars,
  getCarById,
  updateUserImage,
  getChatResponse,
  subscribeEmail
} from "../controllers/userController.js";

import { protect } from "../middleware/auth.js";
import upload from "../middleware/multer.js"; // ✅ FIXED

const userRouter = express.Router();

// AUTH
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/chatbot", getChatResponse);
userRouter.post("/subscribe", subscribeEmail);

// USER
userRouter.get("/me", protect, getUserData);

// ✅ USER PROFILE IMAGE
userRouter.post(
  "/update-image",
  protect,
  upload.single("image"),
  updateUserImage
);

// PUBLIC
userRouter.get("/cars", getCars);
userRouter.get("/cars/:id", getCarById);

export default userRouter;
