import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  // Debug logs
  console.log("🧭 Navbar render - User:", user);
  console.log("🧭 Navbar render - Loading:", loading);
  console.log("🧭 Navbar render - Is Authenticated:", !!user);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      navigate("/");
    }
  };

  // Show loading state
  if (loading) {
    console.log("⏳ Navbar showing loading...");
    return (
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            PureAuth
          </Link>
          <div className="text-gray-500">Loading...</div>
        </div>
      </nav>
    );
  }

  const isAuthenticated = !!user;
  console.log("✨ Navbar final render - isAuthenticated:", isAuthenticated);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
          PureAuth
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          {/* Common links */}
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 transition">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition">
            Contact
          </Link>
          <Link to="/help" className="text-gray-700 hover:text-blue-600 transition">
            Help
          </Link>

          {/* Debug badge */}
          <span className="px-2 py-1 text-xs bg-yellow-100 border rounded">
            {isAuthenticated ? `✅ ${user.name}` : '❌ Not Logged In'}
          </span>

          {/* Auth-based navigation */}
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-600 text-sm">
                Welcome, <span className="font-medium">{user.name}</span>!
              </span>
              <Link
                to="/dashboard"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;