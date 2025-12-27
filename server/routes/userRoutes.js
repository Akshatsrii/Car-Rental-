import express from "express";
import {
  registerUser,
  loginUser,
  getUserData,
  getCars,
  updateUserImage
} from "../controllers/userController.js";

import { protect } from "../middleware/auth.js";
import upload from "../middleware/multer.js"; // ✅ FIXED

const userRouter = express.Router();

// AUTH
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

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

export default userRouter;
