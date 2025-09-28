import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// Response interceptor for auto refresh
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      document.cookie.includes("refreshToken")
    ) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        await API.post("/auth/refresh");
        // Retry the original request
        return API(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login
        console.log("Token refresh failed, redirecting to login");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
