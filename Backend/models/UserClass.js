import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  refreshTokens: [{ token: String, createdAt: Date }],
});

// Compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};

// Generate refresh token
userSchema.methods.generateRefreshToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
  this.refreshTokens.push({ token, createdAt: new Date() });
  this.save();
  return token;
};

// Set cookies
userSchema.methods.setTokenCookies = function (res) {
  const accessToken = this.generateAccessToken();
  const refreshToken = this.generateRefreshToken();

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 59 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

// Format user
userSchema.methods.toResponse = function () {
  return { id: this._id, name: this.name, email: this.email };
};

export default mongoose.model("User", userSchema);
