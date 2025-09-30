import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../api/authAPI";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [initialized, setInitialized] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      setLoading(true);
      const result = await getCurrentUser();

      if (result.success && result.user) {
        setUser(result.user);
        console.log("✅ User fetched:", result.user);
      } else {
        setUser(null);
        console.log("❌ No user found");
      }
    } catch (error) {
      // console.log("Failed to fetch current user:", error.message);
      setUser(null);
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  };

  // Auto-fetch user on app load
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        initialized,
        fetchCurrentUser,
        setUser,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
