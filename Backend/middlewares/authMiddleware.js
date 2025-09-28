import jwt from "jsonwebtoken";
import User from "../models/UserClass.js";
import { ApiResponse } from "../utils/ApiResponse.js";


export const authMiddleware = async (req, res, next) => {
  const api = new ApiResponse(res);
  const token = req.cookies.accessToken;
  if (!token) return api.error("Unauthorized", 401);

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return api.error("User not found", 401);

    req.user = user;
    next();
  } catch (err) {
    api.error("Access token expired", 401);
  }
};
