import API from "./axios";

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await API.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await API.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error(
      "Registration failed:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    const response = await API.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error.response?.data || error.message);
    throw error;
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const response = await API.get("/auth/me");
    return {
      success: true,
      data: response.data,
      user: response.data.payload?.user,
    };
  } catch (error) {
    console.error(
      "Fetching current user failed:",
      error.response?.data || error.message
    );
    throw error;
  }
};

