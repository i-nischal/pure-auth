import { createContext, useContext, useState } from "react";
import { getCurrentUser } from "../api/authAPI";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      setLoading(true);
      const result = await getCurrentUser();

      if (result.success) {
        setUser(result.user);
        console.log("✅ User fetched:", result.user);
      } else {
        setUser(null);
        console.log("❌ No user found:", result.error);
      }
    } catch (error) {
      console.log("Failed to fetch current user data:", error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, fetchCurrentUser, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using AuthContext
export const useAuth = () => useContext(AuthContext);
