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

// Generate refresh token (now async and awaits save)
userSchema.methods.generateRefreshToken = async function () {
  const token = jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
  this.refreshTokens.push({ token, createdAt: new Date() });
  await this.save(); // ✅ Now properly awaited
  return token;
};

// Set cookies (now async)
userSchema.methods.setTokenCookies = async function (res) {
  const accessToken = this.generateAccessToken();
  const refreshToken = await this.generateRefreshToken(); // ✅ Await the async method

  // Access token expires in 15 minutes (shorter than JWT expiry)
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60 * 1000, // ✅ 15 minutes - shorter than 59m JWT
  });

  // Refresh token expires in 30 days
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

// Format user
userSchema.methods.toResponse = function () {
  return { id: this._id, name: this.name, email: this.email };
};

export default mongoose.model("User", userSchema);