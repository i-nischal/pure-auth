import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

function ProtectedRoute({ children }) {
  const { user, loading, initialized } = useAuth();

  // Show loader while checking authentication
  if (!initialized || loading) {
    return <Loader />;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Render children if authenticated
  return children;
}

export default ProtectedRoute;