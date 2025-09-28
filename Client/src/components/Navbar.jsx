import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../api/authAPI";

function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLoading(true); 
      await logoutUser(); 
      setUser(null); 
      navigate("/login"); 
    } catch (error) {
      console.log("Logout failed:", error.response?.data || error.message);
    } finally {
      setLoading(false); // optional
    }
  };

  return (
    <nav className="bg-blue-500 text-white px-6 py-4 flex justify-between items-center">
      <div className="font-bold text-xl">
        <Link to="/">MyApp</Link>
      </div>

      <div className="space-x-4">
        {user ? (
          <>
            <Link
              to="/dashboard"
              className="px-4 py-2 bg-blue-700 rounded hover:bg-blue-600 transition"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 rounded hover:bg-red-400 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-700 rounded hover:bg-blue-600 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-green-500 rounded hover:bg-green-400 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
