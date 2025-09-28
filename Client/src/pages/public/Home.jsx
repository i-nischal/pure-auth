import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome to MyApp
        </h1>
        
        {user ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-green-800 mb-2">
              Hello, {user.name}! 👋
            </h2>
            <p className="text-green-600 mb-4">
              You're successfully logged in. Ready to explore your dashboard?
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-2">
              Get Started Today
            </h2>
            <p className="text-blue-600 mb-4">
              Join thousands of users who trust our platform. Create your account or sign in to continue.
            </p>
            <div className="space-x-4">
              <button
                onClick={() => navigate("/register")}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Create Account
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-3 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition"
              >
                Sign In
              </button>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">🚀 Fast & Secure</h3>
            <p className="text-gray-600">
              Built with modern security practices to keep your data safe.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">📊 Analytics</h3>
            <p className="text-gray-600">
              Get insights and analytics to make better decisions.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">🎨 Beautiful UI</h3>
            <p className="text-gray-600">
              Clean and modern interface designed for the best user experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;