import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../api/authAPI";

function Navbar() {
  const { user, setUser, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log("Logout failed:", error.response?.data || error.message);
    }
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="font-bold text-xl">
          <Link to="/" className="hover:text-blue-200 transition">
            MyApp
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {loading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : user ? (
            <>
              <span className="text-blue-200">Hello, {user.name}!</span>
              <Link
                to="/dashboard"
                className="px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-800 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-800 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
