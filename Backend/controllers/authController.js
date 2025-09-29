import User from "../models/UserClass.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register
export const registerUser = async (req, res) => {
  const api = new ApiResponse(res);
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return api.error("User already exists", 400);

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  user.setTokenCookies(res);
  api.success("User registered successfully", { user: user.toResponse() });
};

// Login
export const loginUser = async (req, res) => {
  const api = new ApiResponse(res);
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return api.error("Invalid credentials", 400);
  }

  user.setTokenCookies(res);
  api.success("Login successful", { user: user.toResponse() });
};

// Refresh token
export const refreshToken = async (req, res) => {
  const api = new ApiResponse(res);
  const token = req.cookies.refreshToken;
  if (!token) return api.error("No refresh token", 401);

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || !user.refreshTokens.find((r) => r.token === token)) {
      return api.error("Invalid refresh token", 401);
    }

    const accessToken = user.generateAccessToken();
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 59 * 60 * 1000,
    });
    api.success("Access token refreshed");
  } catch (err) {
    api.error("Refresh token expired", 401);
  }
};

// Logout
export const logoutUser = async (req, res) => {
  const api = new ApiResponse(res);
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    const decoded = jwt.decode(refreshToken);
    const user = await User.findById(decoded?.id);
    if (user) {
      user.refreshTokens = user.refreshTokens.filter(
        (r) => r.token !== refreshToken
      );
      await user.save();
    }
  }

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  api.success("Logged out successfully");
};

export const getCurrentUser = (req, res) => {
  const api = new ApiResponse(res);
  if (!req.user) return api.error("User not found", 404);

  // Match the same format as login/register responses
  api.success("Current user fetched successfully", {
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
  });
};
