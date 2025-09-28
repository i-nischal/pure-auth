import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  getCurrentUser,
} from "../controllers/authController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", asyncHandler(registerUser));
router.post("/login", asyncHandler(loginUser));
router.post("/refresh", asyncHandler(refreshToken));
router.post("/logout", asyncHandler(logoutUser));
router.get("/me", authMiddleware, asyncHandler(getCurrentUser));

export default router;
