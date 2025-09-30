import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// Track if we're currently refreshing to prevent multiple refresh calls
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response interceptor for auto refresh
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // IMPORTANT: Skip refresh logic for auth endpoints
    const authEndpoints = [
      "/auth/login",
      "/auth/register",
      "/auth/refresh",
      "/auth/me",
    ];
    const isAuthEndpoint = authEndpoints.some((endpoint) =>
      originalRequest.url.includes(endpoint)
    );

    // Don't try to refresh for auth endpoints or if not a 401 error
    if (isAuthEndpoint || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Check if we've already tried to refresh for this request
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // If we're already refreshing, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => {
          return API(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // Try to refresh the token
      await API.post("/auth/refresh");

      console.log("✅ Access token refreshed");

      // Process queued requests
      processQueue(null);

      // Retry the original request
      return API(originalRequest);
    } catch (refreshError) {
      // Process queued requests with error
      processQueue(refreshError);

      // Only redirect if not already on auth pages
      const currentPath = window.location.pathname;
      if (
        !currentPath.includes("/login") &&
        !currentPath.includes("/register")
      ) {
        console.log("Session expired, redirecting to login");
        window.location.href = "/login";
      }

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default API;
