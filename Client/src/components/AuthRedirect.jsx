import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

// This component redirects authenticated users away from login/register pages
function AuthRedirect({ children }) {
  const { user, loading, initialized } = useAuth();

  // Show loader while checking authentication
  if (!initialized || loading) {
    return <Loader />;
  }

  // Redirect to dashboard if user is already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // Render login/register page if not authenticated
  return children;
}

export default AuthRedirect;
