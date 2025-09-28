import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import PublicPage1 from "../pages/public/PublicPage1";
import PublicPage2 from "../pages/public/PublicPage2";
import PublicPage3 from "../pages/public/PublicPage3";
import PublicPage4 from "../pages/public/PublicPage4";

import PrivatePage1 from "../pages/private/PrivatePage1";
import PrivatePage2 from "../pages/private/PrivatePage2";
import PrivatePage3 from "../pages/private/PrivatePage3";
import PrivatePage4 from "../pages/private/PrivatePage4";
import PrivatePage5 from "../pages/private/PrivatePage5";
import PrivatePage6 from "../pages/private/PrivatePage6";
import PrivatePage7 from "../pages/private/PrivatePage7";
import PrivatePage8 from "../pages/private/PrivatePage8";
import PrivatePage9 from "../pages/private/PrivatePage9";
import PrivatePage10 from "../pages/private/PrivatePage10";

import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

// ✅ Private route wrapper
const PrivateRoute = ({ user }) => {
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

// ✅ Public route wrapper
const PublicRoute = ({ user }) => {
  return !user ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

const AppRoutes = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<PublicPage1 />} />
      <Route path="/about" element={<PublicPage2 />} />
      <Route path="/contact" element={<PublicPage3 />} />
      <Route path="/help" element={<PublicPage4 />} />

      {/* Auth routes (only if not logged in) */}
      <Route element={<PublicRoute user={user} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Private routes (only if logged in) */}
      <Route element={<PrivateRoute user={user} />}>
        <Route path="/dashboard" element={<PrivatePage1 />} />
        <Route path="/profile" element={<PrivatePage2 />} />
        <Route path="/settings" element={<PrivatePage3 />} />
        <Route path="/analytics" element={<PrivatePage4 />} />
        <Route path="/reports" element={<PrivatePage5 />} />
        <Route path="/team" element={<PrivatePage6 />} />
        <Route path="/projects" element={<PrivatePage7 />} />
        <Route path="/tasks" element={<PrivatePage8 />} />
        <Route path="/notifications" element={<PrivatePage9 />} />
        <Route path="/messages" element={<PrivatePage10 />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
