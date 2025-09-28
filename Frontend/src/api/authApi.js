import API from "./axios";

// Authentication API service
export const authApi = {
  // Login user
  login: async (email, password) => {
    try {
      const response = await API.post("/login", { email, password });
      return {
        success: true,
        data: response.data,
        user: response.data.payload?.user,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  },

  // Register user
  register: async (name, email, password) => {
    try {
      const response = await API.post("/register", { name, email, password });
      return {
        success: true,
        data: response.data,
        user: response.data.payload?.user,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed",
      };
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await API.get("/me");
      return {
        success: true,
        data: response.data,
        user: response.data.payload?.user,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to get user",
      };
    }
  },

  // Logout user
  logout: async () => {
    try {
      const response = await API.post("/logout");
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Logout failed",
      };
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const response = await API.post("/refresh");
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Token refresh failed",
      };
    }
  },
};
