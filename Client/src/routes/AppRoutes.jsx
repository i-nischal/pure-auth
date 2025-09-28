import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import Home from "../pages/public/Home";
import Blogs from "../pages/Blogs";
import Login from "../components/admin/Login";
import Dashboard from "../pages/private/Dashboard";
import Register from "../components/admin/Register";
import { useAuth } from "../context/AuthContext";

function AppRoutes() {
  const { user } = useAuth();

  // PrivateRoute must render Outlet for nested routes to work
  const PrivateRoute = () => {
    return user ? <Outlet /> : <Navigate to="/login" replace />;
  };

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Private routes Grouping */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Add all other private routes here */}
      </Route>

      {/* Optional: Catch-all route for 404 */}
      {/* <Route path="*" element={<div>404 Not Found</div>} /> */}
    </Routes>
  );
}

export default AppRoutes;
