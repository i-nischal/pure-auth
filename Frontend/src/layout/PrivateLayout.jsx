import React from "react";
import { Outlet } from "react-router-dom";

const PrivateLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md p-4 text-center font-bold text-xl text-blue-600">
        Private Area
      </header>

      {/* Page content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner py-4 text-center text-gray-500 text-sm">
        © 2025 PureAuth. All rights reserved.
      </footer>
    </div>
  );
};

export default PrivateLayout;
