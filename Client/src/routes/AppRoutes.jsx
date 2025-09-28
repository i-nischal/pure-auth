import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/public/Home";
import Blogs from "../pages/Blogs";
import Login from "../components/admin/Login";
import Dashboard from "../pages/private/Dashboard";
import Register from "../components/admin/Register";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import Layout from "../layout/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import AuthRedirect from "../components/AuthRedirect";

function AppRoutes() {
  const { loading, initialized } = useAuth();

  // Show loader while initializing auth
  if (!initialized || loading) {
    return <Loader />;
  }

  return (
    <Routes>
      {/* Public routes with layout */}
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />

      <Route
        path="/blogs"
        element={
          <Layout>
            <Blogs />
          </Layout>
        }
      />

      {/* Auth routes without layout - redirect if already logged in */}
      <Route
        path="/login"
        element={
          <AuthRedirect>
            <Login />
          </AuthRedirect>
        }
      />
      <Route
        path="/register"
        element={
          <AuthRedirect>
            <Register />
          </AuthRedirect>
        }
      />

      {/* Protected routes with layout */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
