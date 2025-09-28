import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { authApi } from "../../api/authApi";

const Register = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("📝 Attempting registration...");

      const result = await authApi.register(name, email, password);

      if (result.success) {
        console.log("✅ Registration successful:", result.user);
        setUser(result.user);
        navigate("/dashboard");
      } else {
        console.log("❌ Registration failed:", result.error);
        setError(result.error);
      }
    } catch (err) {
      console.error("❌ Registration error:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-6 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Register"}
        </button>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
