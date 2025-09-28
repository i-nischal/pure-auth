import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user
  const fetchCurrentUser = async () => {
    try {
      setLoading(true);
      console.log("📡 Fetching current user...");

      const result = await authApi.getCurrentUser();

      if (result.success) {
        setUser(result.user);
        console.log("✅ User fetched:", result.user);
      } else {
        setUser(null);
        console.log("❌ No user found:", result.error);
      }
    } catch (err) {
      console.log("❌ Fetch user error:", err.message);
      setUser(null);
    } finally {
      setLoading(false);
      console.log("🏁 Loading complete");
    }
  };

  // Logout function
  const logout = async () => {
    try {
      console.log("🚪 Logging out...");
      await authApi.logout();
      setUser(null);
      console.log("✅ Logout successful");
    } catch (err) {
      console.error("❌ Logout error:", err);
      setUser(null); // Clear user anyway
    }
  };

  useEffect(() => {
    console.log("🚀 AuthProvider mounted, fetching current user...");
    fetchCurrentUser();
  }, []);

  // Debug: Log when user state changes
  useEffect(() => {
    console.log("👤 User state changed:", user);
  }, [user]);

  // Debug: Log when loading state changes
  useEffect(() => {
    console.log("⏳ Loading state changed:", loading);
  }, [loading]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, fetchCurrentUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
